-- Dashboard support schema for Meta Ads & Facebook Posts analytics
-- Run this file inside Supabase SQL editor or psql.
-- It creates helper views, RPC-friendly functions, and indexes.

-- ============================================
-- Views
-- ============================================

create or replace view public.analytics_ad_metrics_daily as
with casted as (
  select
    date::date as date,
    account_id,
    campaign_id,
    campaign_name,
    adset_id,
    adset_name,
    ad_id,
    ad_name,
    post_id,
    objective,
    currency,
    coalesce(impressions::numeric, 0) as impressions,
    coalesce(clicks::numeric, 0) as clicks,
    coalesce(spend::numeric, 0) as spend,
    coalesce(purchases::numeric, 0) as purchases,
    coalesce(revenue::numeric, 0) as revenue,
    coalesce(video_thruplays::numeric, 0) as video_thruplays,
    coalesce(video_3s_views::numeric, 0) as video_views_3s,
    coalesce(video_30s_views::numeric, 0) as video_views_30s,
    coalesce(video_p25::numeric, 0) as video_p25,
    coalesce(video_p50::numeric, 0) as video_p50,
    coalesce(video_p75::numeric, 0) as video_p75,
    coalesce(video_p95::numeric, 0) as video_p95
  from public.fb_insights_daily
)
select
  date,
  account_id,
  campaign_id,
  campaign_name,
  adset_id,
  adset_name,
  ad_id,
  ad_name,
  post_id,
  objective,
  currency,
  impressions,
  clicks,
  spend,
  purchases,
  revenue,
  video_thruplays,
  video_views_3s,
  video_views_30s,
  video_p25,
  video_p50,
  video_p75,
  video_p95,
  case when clicks > 0 then spend / clicks else null end as computed_cpc,
  case when impressions > 0 then spend / impressions * 1000 else null end as computed_cpm,
  case when impressions > 0 then clicks / impressions else null end as computed_ctr,
  case when spend > 0 then revenue / spend else null end as computed_roas
from casted;

comment on view public.analytics_ad_metrics_daily is 'Daily ad-level metrics with numeric casts and derived KPIs.';


create or replace view public.analytics_post_page_daily as
select
  date::date as date,
  post_id,
  max(post_created_time) as post_created_time,
  max(post_type) as post_type,
  max(permalink) as permalink,
  max(message_preview) as message_preview,
  max(page_id) as page_id,
  sum(coalesce(impressions_total::numeric, 0)) as impressions_total,
  sum(coalesce(impressions_paid::numeric, 0)) as impressions_paid,
  sum(coalesce(impressions_organic::numeric, 0)) as impressions_organic,
  sum(coalesce(reach_total::numeric, 0)) as reach_total,
  sum(coalesce(reach_paid::numeric, 0)) as reach_paid,
  sum(coalesce(reach_organic::numeric, 0)) as reach_organic,
  sum(coalesce(clicks_all::numeric, 0)) as clicks_all,
  sum(coalesce(clicks_link::numeric, 0)) as clicks_link,
  sum(coalesce(reactions::numeric, 0)) as reactions,
  sum(coalesce(comments::numeric, 0)) as comments,
  sum(coalesce(shares::numeric, 0)) as shares,
  sum(coalesce(saves::numeric, 0)) as saves,
  sum(coalesce(video_views_3s::numeric, 0)) as video_views_3s,
  sum(coalesce(video_views_15s::numeric, 0)) as video_views_15s,
  sum(coalesce(video_thruplays::numeric, 0)) as video_thruplays,
  avg(coalesce(video_avg_watch_time::numeric, 0)) as video_avg_watch_time
from public.fb_post_insights_daily
group by date, post_id;

comment on view public.analytics_post_page_daily is 'Daily organic (page) metrics for each post with numeric casts.';


-- ============================================
-- Helper function to filter ads once
-- ============================================

create or replace function public.filtered_ads(
  p_start date,
  p_end date,
  p_campaign_ids text[] default null,
  p_adset_ids text[] default null,
  p_post_ids text[] default null
)
returns table (
  date date,
  account_id text,
  campaign_id text,
  campaign_name text,
  adset_id text,
  adset_name text,
  ad_id text,
  ad_name text,
  post_id text,
  objective text,
  currency text,
  impressions numeric,
  clicks numeric,
  spend numeric,
  purchases numeric,
  revenue numeric,
  video_thruplays numeric,
  video_views_3s numeric,
  video_views_30s numeric,
  video_p25 numeric,
  video_p50 numeric,
  video_p75 numeric,
  video_p95 numeric,
  computed_cpc numeric,
  computed_cpm numeric,
  computed_ctr numeric,
  computed_roas numeric
)
language sql
security definer
set search_path = public
as $$
  select *
  from public.analytics_ad_metrics_daily
  where date >= coalesce(p_start, date)
    and date <= coalesce(p_end, date)
    and (p_campaign_ids is null or campaign_id = any(p_campaign_ids))
    and (p_adset_ids is null or adset_id = any(p_adset_ids))
    and (p_post_ids is null or post_id = any(p_post_ids));
$$;

comment on function public.filtered_ads is 'Reusable filter on analytics_ad_metrics_daily (used by RPC functions).';


-- ============================================
-- RPC-friendly functions
-- ============================================

create or replace function public.dashboard_overview(
  p_start date,
  p_end date,
  p_campaign_ids text[] default null,
  p_adset_ids text[] default null,
  p_post_ids text[] default null
)
returns table (
  total_spend numeric,
  total_revenue numeric,
  total_purchases numeric,
  total_impressions numeric,
  total_clicks numeric,
  video_views_3s numeric,
  video_thruplays numeric,
  avg_cpc numeric,
  avg_cpm numeric,
  avg_ctr numeric,
  roas numeric
)
language sql
security definer
set search_path = public
as $$
  with ads as (
    select * from public.filtered_ads(p_start, p_end, p_campaign_ids, p_adset_ids, p_post_ids)
  )
  select
    coalesce(sum(spend), 0) as total_spend,
    coalesce(sum(revenue), 0) as total_revenue,
    coalesce(sum(purchases), 0) as total_purchases,
    coalesce(sum(impressions), 0) as total_impressions,
    coalesce(sum(clicks), 0) as total_clicks,
    coalesce(sum(video_views_3s), 0) as video_views_3s,
    coalesce(sum(video_thruplays), 0) as video_thruplays,
    case when sum(clicks) > 0 then sum(spend) / nullif(sum(clicks), 0) end as avg_cpc,
    case when sum(impressions) > 0 then sum(spend) / nullif(sum(impressions), 0) * 1000 end as avg_cpm,
    case when sum(impressions) > 0 then sum(clicks) / nullif(sum(impressions), 0) end as avg_ctr,
    case when sum(spend) > 0 then sum(revenue) / nullif(sum(spend), 0) end as roas
  from ads;
$$;


create or replace function public.dashboard_top_posts(
  p_start date,
  p_end date,
  p_limit integer default 10,
  p_order text default 'roas',
  p_campaign_ids text[] default null,
  p_adset_ids text[] default null,
  p_post_ids text[] default null
)
returns table (
  post_id text,
  post_type text,
  message_preview text,
  permalink text,
  currency text,
  spend numeric,
  revenue numeric,
  purchases numeric,
  impressions numeric,
  clicks numeric,
  roas numeric,
  ctr numeric,
  cpc numeric,
  cpm numeric,
  video_thruplays numeric,
  cost_per_thruplay numeric,
  reach_total numeric,
  reach_paid numeric,
  reach_organic numeric,
  impressions_total numeric,
  impressions_paid numeric,
  impressions_organic numeric,
  reactions numeric,
  comments numeric,
  shares numeric,
  saves numeric
)
language sql
security definer
set search_path = public
as $$
  with ads as (
    select *
    from public.filtered_ads(p_start, p_end, p_campaign_ids, p_adset_ids, p_post_ids)
    where post_id is not null
  ),
  per_post_ads as (
    select
      post_id,
      max(currency) as currency,
      sum(spend) as spend,
      sum(revenue) as revenue,
      sum(purchases) as purchases,
      sum(impressions) as impressions,
      sum(clicks) as clicks,
      sum(video_thruplays) as video_thruplays,
      case when sum(spend) > 0 then sum(revenue) / nullif(sum(spend), 0) end as roas,
      case when sum(clicks) > 0 then sum(spend) / nullif(sum(clicks), 0) end as cpc,
      case when sum(impressions) > 0 then sum(spend) / nullif(sum(impressions), 0) * 1000 end as cpm,
      case when sum(impressions) > 0 then sum(clicks) / nullif(sum(impressions), 0) end as ctr,
      case when sum(video_thruplays) > 0 then sum(spend) / nullif(sum(video_thruplays), 0) end as cost_per_thruplay
    from ads
    group by post_id
  ),
  organic as (
    select
      post_id,
      max(post_type) as post_type,
      max(message_preview) as message_preview,
      max(permalink) as permalink,
      sum(reach_total) as reach_total,
      sum(reach_paid) as reach_paid,
      sum(reach_organic) as reach_organic,
      sum(impressions_total) as impressions_total,
      sum(impressions_paid) as impressions_paid,
      sum(impressions_organic) as impressions_organic,
      sum(reactions) as reactions,
      sum(comments) as comments,
      sum(shares) as shares,
      sum(saves) as saves
    from public.analytics_post_page_daily
    where date between coalesce(p_start, date) and coalesce(p_end, date)
    group by post_id
  )
  select
    ppa.post_id,
    organic.post_type,
    organic.message_preview,
    organic.permalink,
    ppa.currency,
    ppa.spend,
    ppa.revenue,
    ppa.purchases,
    ppa.impressions,
    ppa.clicks,
    ppa.roas,
    ppa.ctr,
    ppa.cpc,
    ppa.cpm,
    ppa.video_thruplays,
    ppa.cost_per_thruplay,
    organic.reach_total,
    organic.reach_paid,
    organic.reach_organic,
    organic.impressions_total,
    organic.impressions_paid,
    organic.impressions_organic,
    organic.reactions,
    organic.comments,
    organic.shares,
    organic.saves
  from per_post_ads ppa
  left join organic on organic.post_id = ppa.post_id
  order by
    case when p_order = 'revenue' then ppa.revenue end desc,
    case when p_order = 'spend' then ppa.spend end desc,
    case when p_order = 'impressions' then ppa.impressions end desc,
    case when p_order = 'clicks' then ppa.clicks end desc,
    case when p_order = 'thruplays' then ppa.video_thruplays end desc,
    case when p_order = 'cost_per_thruplay' then ppa.cost_per_thruplay end asc,
    ppa.roas desc
  limit coalesce(p_limit, 10);
$$;


create or replace function public.dashboard_time_series(
  p_start date,
  p_end date,
  p_granularity text default 'day',
  p_campaign_ids text[] default null,
  p_adset_ids text[] default null,
  p_post_ids text[] default null
)
returns table (
  bucket date,
  spend numeric,
  revenue numeric,
  purchases numeric,
  impressions numeric,
  clicks numeric,
  ctr numeric,
  cpc numeric,
  cpm numeric,
  roas numeric,
  video_views_3s numeric,
  video_thruplays numeric
)
language sql
security definer
set search_path = public
as $$
  with ads as (
    select
      date_trunc(case when lower(p_granularity) = 'week' then 'week' else 'day' end, date)::date as bucket,
      spend,
      revenue,
      purchases,
      impressions,
      clicks,
      video_views_3s,
      video_thruplays
    from public.filtered_ads(p_start, p_end, p_campaign_ids, p_adset_ids, p_post_ids)
  )
  select
    bucket,
    sum(spend) as spend,
    sum(revenue) as revenue,
    sum(purchases) as purchases,
    sum(impressions) as impressions,
    sum(clicks) as clicks,
    case when sum(impressions) > 0 then sum(clicks) / nullif(sum(impressions), 0) end as ctr,
    case when sum(clicks) > 0 then sum(spend) / nullif(sum(clicks), 0) end as cpc,
    case when sum(impressions) > 0 then sum(spend) / nullif(sum(impressions), 0) * 1000 end as cpm,
    case when sum(spend) > 0 then sum(revenue) / nullif(sum(spend), 0) end as roas,
    sum(video_views_3s) as video_views_3s,
    sum(video_thruplays) as video_thruplays
  from ads
  group by bucket
  order by bucket;
$$;


create or replace function public.dashboard_post_detail(
  p_post_id text,
  p_start date,
  p_end date
)
returns table (
  post_id text,
  post_type text,
  message_preview text,
  permalink text,
  post_created_time timestamptz,
  impressions_total numeric,
  impressions_paid numeric,
  impressions_organic numeric,
  reach_total numeric,
  reach_paid numeric,
  reach_organic numeric,
  clicks_all numeric,
  clicks_link numeric,
  reactions numeric,
  comments numeric,
  shares numeric,
  saves numeric,
  video_views_3s numeric,
  video_thruplays numeric,
  video_avg_watch_time numeric,
  ad_spend numeric,
  ad_revenue numeric,
  ad_purchases numeric,
  ad_impressions numeric,
  ad_clicks numeric,
  ad_roas numeric,
  ad_cpc numeric,
  ad_cpm numeric,
  ad_ctr numeric,
  ads jsonb
)
language sql
security definer
set search_path = public
as $$
  with ads as (
    select *
    from public.filtered_ads(p_start, p_end, null, null, array[p_post_id])
  ),
  ad_breakdown as (
    select
      jsonb_agg(
        jsonb_build_object(
          'ad_id', ad_id,
          'ad_name', ad_name,
          'adset_name', adset_name,
          'campaign_name', campaign_name,
          'spend', spend,
          'revenue', revenue,
          'impressions', impressions,
          'clicks', clicks,
          'roas', case when spend > 0 then revenue / nullif(spend, 0) end
        )
        order by spend desc
      ) as ads
    from (
      select
        ad_id,
        max(ad_name) as ad_name,
        max(adset_name) as adset_name,
        max(campaign_name) as campaign_name,
        sum(spend) as spend,
        sum(revenue) as revenue,
        sum(impressions) as impressions,
        sum(clicks) as clicks
      from ads
      group by ad_id
    ) grouped
  ),
  ad_totals as (
    select
      sum(spend) as ad_spend,
      sum(revenue) as ad_revenue,
      sum(purchases) as ad_purchases,
      sum(impressions) as ad_impressions,
      sum(clicks) as ad_clicks,
      case when sum(spend) > 0 then sum(revenue) / nullif(sum(spend), 0) end as ad_roas,
      case when sum(clicks) > 0 then sum(spend) / nullif(sum(clicks), 0) end as ad_cpc,
      case when sum(impressions) > 0 then sum(spend) / nullif(sum(impressions), 0) * 1000 end as ad_cpm,
      case when sum(impressions) > 0 then sum(clicks) / nullif(sum(impressions), 0) end as ad_ctr
    from ads
  ),
  organic as (
    select
      post_id,
      max(post_type) as post_type,
      max(message_preview) as message_preview,
      max(permalink) as permalink,
      max(post_created_time) as post_created_time,
      sum(impressions_total) as impressions_total,
      sum(impressions_paid) as impressions_paid,
      sum(impressions_organic) as impressions_organic,
      sum(reach_total) as reach_total,
      sum(reach_paid) as reach_paid,
      sum(reach_organic) as reach_organic,
      sum(clicks_all) as clicks_all,
      sum(clicks_link) as clicks_link,
      sum(reactions) as reactions,
      sum(comments) as comments,
      sum(shares) as shares,
      sum(saves) as saves,
      sum(video_views_3s) as video_views_3s,
      sum(video_thruplays) as video_thruplays,
      avg(video_avg_watch_time) as video_avg_watch_time
    from public.analytics_post_page_daily
    where post_id = p_post_id
      and date between coalesce(p_start, date) and coalesce(p_end, date)
    group by post_id
  )
  select
    base.post_id,
    organic.post_type,
    organic.message_preview,
    organic.permalink,
    organic.post_created_time,
    organic.impressions_total,
    organic.impressions_paid,
    organic.impressions_organic,
    organic.reach_total,
    organic.reach_paid,
    organic.reach_organic,
    organic.clicks_all,
    organic.clicks_link,
    organic.reactions,
    organic.comments,
    organic.shares,
    organic.saves,
    organic.video_views_3s,
    organic.video_thruplays,
    organic.video_avg_watch_time,
    ad_totals.ad_spend,
    ad_totals.ad_revenue,
    ad_totals.ad_purchases,
    ad_totals.ad_impressions,
    ad_totals.ad_clicks,
    ad_totals.ad_roas,
    ad_totals.ad_cpc,
    ad_totals.ad_cpm,
    ad_totals.ad_ctr,
    ad_breakdown.ads
  from (select p_post_id as post_id) base
  left join organic on organic.post_id = base.post_id
  cross join ad_totals
  cross join ad_breakdown;
$$;


create or replace function public.dashboard_filter_options(
  p_start date default null,
  p_end date default null
)
returns table (
  campaigns jsonb,
  adsets jsonb,
  posts jsonb
)
language sql
security definer
set search_path = public
as $$
  with ads as (
    select *
    from public.filtered_ads(p_start, p_end, null, null, null)
  ),
  campaign_opts as (
    select jsonb_agg(
      jsonb_build_object('id', campaign_id, 'name', campaign_name)
      order by campaign_name
    ) as campaigns
    from (
      select distinct campaign_id, campaign_name
      from ads
      where campaign_id is not null
    ) distinct_campaigns
  ),
  adset_opts as (
    select jsonb_agg(
      jsonb_build_object(
        'id', adset_id,
        'name', adset_name,
        'campaignId', campaign_id
      )
      order by adset_name
    ) as adsets
    from (
      select distinct adset_id, adset_name, campaign_id
      from ads
      where adset_id is not null
    ) distinct_adsets
  ),
  post_opts as (
    select jsonb_agg(
      jsonb_build_object(
        'id', post_id,
        'preview', left(coalesce(message_preview, ''), 120)
      )
      order by post_id
    ) as posts
    from (
      select distinct post_id, message_preview
      from public.analytics_post_page_daily
      where post_id is not null
      and date between coalesce(p_start, date) and coalesce(p_end, date)
    ) distinct_posts
  )
  select
    coalesce(campaign_opts.campaigns, '[]'::jsonb),
    coalesce(adset_opts.adsets, '[]'::jsonb),
    coalesce(post_opts.posts, '[]'::jsonb)
  from campaign_opts, adset_opts, post_opts;
$$;


-- ============================================
-- Helpful indexes (run once)
-- ============================================

create index if not exists idx_fb_insights_daily_date on public.fb_insights_daily (date);
create index if not exists idx_fb_insights_daily_post on public.fb_insights_daily (post_id);
create index if not exists idx_fb_insights_daily_campaign on public.fb_insights_daily (campaign_id);
create index if not exists idx_fb_insights_daily_adset on public.fb_insights_daily (adset_id);

create index if not exists idx_fb_post_insights_daily_date on public.fb_post_insights_daily (date);
create index if not exists idx_fb_post_insights_daily_post on public.fb_post_insights_daily (post_id);
