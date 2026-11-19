import { AbstractEntity } from '../../../../../abstractEntity';
import { CampaignBackground, CampaignButton, CampaignMedia } from '../campaign';

// Campaign LandingPage Types
export type CampaignLandingPageType = {
  displayConfiguration: number;
  title: string;
  widgets: LandingPageWidgetType[];
};

export type LandingPageWidgetType =
  | LandingPageHeroComponentType
  | LandingPageMediaComponentType
  | LandingPageCardsComponentType
  | LandingPageRichTextComponentType
  | LandingPageContactFormComponentType
  | LandingPageFAQComponentType;

export type LandingPageHeroComponentType = {
  category: LandingPageWidgetCategory.HERO;
  alignement: LandingPageComponentAlignement;
  background: CampaignBackground;
  button1?: CampaignButton;
  button1Activated: boolean;
  button2?: CampaignButton;
  button2Activated: boolean;
  description?: string;
  media: CampaignMedia;
  subtitle?: string;
  subtitleActivated: boolean;
  // Hexadecimal color of the texts, chosen automatically from the background when undefined
  textColor?: string;
  title?: string;
};

export type LandingPageMediaComponentType = {
  category: LandingPageWidgetCategory.MEDIA;
  button1?: CampaignButton;
  button1Activated: boolean;
  button2?: CampaignButton;
  button2Activated: boolean;
  description?: string;
  displayConfiguration: number;
  media: CampaignMedia;
  subtitle?: string;
  subtitleActivated: boolean;
  title?: string;
};

export type LandingPageCardsComponentType = {
  category: LandingPageWidgetCategory.CARDS;
  alignement: LandingPageComponentAlignement;
  cards: LandingPageCardType[];
  description?: string;
  subtitle?: string;
  subtitleActivated: boolean;
  title?: string;
};

export type LandingPageCardType = {
  button1?: CampaignButton;
  button1Activated: boolean;
  button2?: CampaignButton;
  button2Activated: boolean;
  description: string;
  media: CampaignMedia;
  title: string;
};

export type LandingPageRichTextComponentType = {
  category: LandingPageWidgetCategory.RICH_TEXT;
  alignement: LandingPageComponentAlignement;
  background: CampaignBackground;
  button1?: CampaignButton;
  button1Activated: boolean;
  button2?: CampaignButton;
  button2Activated: boolean;
  description: string;
  subtitle?: string;
  subtitleActivated: boolean;
  title: string;
};

export type LandingPageContactFormComponentType = {
  category: LandingPageWidgetCategory.CONTACT_FORM;
  alignement: LandingPageComponentAlignement;
  button?: CampaignButton;
  description: string;
  email: string;
  openQuestionTitle: string;
  subtitle?: string;
  subtitleActivated: boolean;
  // Terms and conditions the visitors accept, displayed in a modal
  termsDescription: string;
  termsTitle: string;
  title: string;
};

export type LandingPageFAQComponentType = {
  category: LandingPageWidgetCategory.FAQ;
  alignement: LandingPageComponentAlignement;
  description: string;
  // Hexadecimal color of the questions, the text color when undefined
  questionColor?: string;
  questions: LandingPageFAQQuestionType[];
  subtitle?: string;
  subtitleActivated: boolean;
  title: string;
};

export type LandingPageFAQQuestionType = {
  answer: string;
  question: string;
};

export enum LandingPageComponentAlignement {
  CENTER = 'center',
  LEFT = 'left',
}

export enum LandingPageFields {
  COLUMN_DISPLAY_CONFIGURATION = 'displayConfiguration',
  COLUMN_TITLE = 'title',
  COLUMN_WIDGETS = 'widgets',
}

export enum LandingPageWidgetCategory {
  HERO = 'hero',
  MEDIA = 'media',
  CARDS = 'cards',
  RICH_TEXT = 'richText',
  CONTACT_FORM = 'contactForm',
  FAQ = 'faq',
}

export class CampaignLandingPage extends AbstractEntity<CampaignLandingPageType> {
  readonly #displayConfiguration: number;
  readonly #title: string;
  readonly #widgets: LandingPageWidgetType[];

  constructor(landingPageInput: CampaignLandingPageType) {
    super(landingPageInput);
    this.#displayConfiguration =
      landingPageInput[LandingPageFields.COLUMN_DISPLAY_CONFIGURATION];
    this.#title = landingPageInput[LandingPageFields.COLUMN_TITLE];
    this.#widgets = landingPageInput[LandingPageFields.COLUMN_WIDGETS];
  }

  get displayConfiguration(): number {
    return this.#displayConfiguration;
  }

  get title(): string {
    return this.#title;
  }

  get widgets(): LandingPageWidgetType[] {
    return this.#widgets;
  }

  public toJSON(): CampaignLandingPageType {
    return {
      [LandingPageFields.COLUMN_DISPLAY_CONFIGURATION]: this
        .displayConfiguration,
      [LandingPageFields.COLUMN_TITLE]: this.title,
      [LandingPageFields.COLUMN_WIDGETS]: this.widgets,
    };
  }
}
