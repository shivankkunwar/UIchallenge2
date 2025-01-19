export interface KPIMetric {
    purchases: number,
    revenue: number,
    refunds:number
  }
  
  export interface MonthlyComparison {
    id:number,
    month: string
    last_year: number
    this_year: number
  }
  export interface CustomLegendProps {
    payload?: Array<{
      color: string;
      value: string;
      type?: string;
      id?: string;
    }>;
  }
  export interface CustomerDevice {
    date: string
    unique_count: number
    cumulative_tweets: number
  }
  
  export interface TopProduct {
    id: number
    product_name: string
    sold_amount: number
    unit_price: number
    revenue: number
    rating: number
    image_url: string
  }
  
  export interface CommunityFeedback {
    negative: number
    neutral: number
    positive: number
  }
  
  export interface PerformanceScore {
    score: number
    title: string,
    message: string,
  }