export interface Promotions {
  attributes: {
    name: string;
    title: string;
    subtitle: string;
    disclaimer: string;
    display_amount: number;
    display_currency: string;
    tooltip: string;
    button_text: string;
    description: string;
    type: string;
    program_id: number;
    no_of_attempts: number;
    max_count: number;
    version: number;
    createdAt: string;
    video_url: string;
    image_url: string;
    display_expiry_flag:  number;
    survey_question: Object;
    gatekeeper: boolean;
    gatekeeper_promotions: Array<number>;
    expiring_soon: number;
    created_by_name: string;
    created_on: string;
    publishedAt: string;
    status: string;
    updatedAt: string;
    updated_by_name: string;
    updated_on: string;
    disablePromotion: boolean;
    progress_type: string;
  };
  id: number;
}
