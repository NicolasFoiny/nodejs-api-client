import { AbstractEntity } from '../../../abstractEntity';

export enum ConversionSkuResultFields {
  COLUMN_BILLING_CYCLE = 'billingCycle',
  COLUMN_END_DATE = 'endDate',
  COLUMN_FRIENDLY_NAME = 'friendlyName',
  COLUMN_LICENSE_REFERENCE = 'licenseReference',
  COLUMN_NAME = 'name',
  COLUMN_SEATS = 'seats',
  COLUMN_SKU = 'sku',
  COLUMN_TERM = 'term',
  COLUMN_TOTAL_BUY_PRICE = 'totalBuyPrice',
}

export type ConversionSkuExistingResultData = {
  [ConversionSkuResultFields.COLUMN_BILLING_CYCLE]: number;
  [ConversionSkuResultFields.COLUMN_END_DATE]?: string;
  [ConversionSkuResultFields.COLUMN_FRIENDLY_NAME]?: string;
  [ConversionSkuResultFields.COLUMN_LICENSE_REFERENCE]?: string;
  [ConversionSkuResultFields.COLUMN_NAME]: string;
  [ConversionSkuResultFields.COLUMN_SEATS]?: number;
  [ConversionSkuResultFields.COLUMN_SKU]: string;
  [ConversionSkuResultFields.COLUMN_TERM]: number;
  [ConversionSkuResultFields.COLUMN_TOTAL_BUY_PRICE]: number;
};

export type ConversionSkuResultData = {
  [ConversionSkuResultFields.COLUMN_BILLING_CYCLE]: number;
  [ConversionSkuResultFields.COLUMN_NAME]: string;
  [ConversionSkuResultFields.COLUMN_SKU]: string;
  [ConversionSkuResultFields.COLUMN_TERM]: number;
  [ConversionSkuResultFields.COLUMN_TOTAL_BUY_PRICE]: number;
};

export class ConversionSkuResult extends AbstractEntity<ConversionSkuExistingResultData> {
  readonly #billingCycle: number;
  readonly #endDate?: string;
  readonly #friendlyName?: string;
  readonly #licenseReference?: string;
  readonly #name: string;
  readonly #seats?: number;
  readonly #sku: string;
  readonly #term: number;
  readonly #totalBuyPrice: number;

  public constructor(data: ConversionSkuExistingResultData) {
    super(data);

    this.#billingCycle = data[ConversionSkuResultFields.COLUMN_BILLING_CYCLE];
    this.#endDate =
      data[ConversionSkuResultFields.COLUMN_END_DATE] ?? undefined;
    this.#friendlyName = data[ConversionSkuResultFields.COLUMN_FRIENDLY_NAME];
    this.#licenseReference =
      data[ConversionSkuResultFields.COLUMN_LICENSE_REFERENCE] ?? undefined;
    this.#name = data[ConversionSkuResultFields.COLUMN_NAME];
    this.#seats = data[ConversionSkuResultFields.COLUMN_SEATS] ?? undefined;
    this.#sku = data[ConversionSkuResultFields.COLUMN_SKU];
    this.#term = data[ConversionSkuResultFields.COLUMN_TERM];
    this.#totalBuyPrice =
      data[ConversionSkuResultFields.COLUMN_TOTAL_BUY_PRICE];
  }

  public get billingCycle(): number {
    return this.#billingCycle;
  }

  public get endDate(): string | undefined {
    return this.#endDate;
  }

  public get friendlyName(): string | undefined {
    return this.#friendlyName;
  }

  public get licenseReference(): string | undefined {
    return this.#licenseReference;
  }

  public get name(): string {
    return this.#name;
  }

  public get seats(): number | undefined {
    return this.#seats;
  }

  public get sku(): string {
    return this.#sku;
  }

  public get term(): number {
    return this.#term;
  }

  public get totalBuyPrice(): number {
    return this.#totalBuyPrice;
  }

  public toJSON(): ConversionSkuExistingResultData | ConversionSkuResultData {
    if (!this.licenseReference && !this.seats) {
      return {
        [ConversionSkuResultFields.COLUMN_BILLING_CYCLE]: this.billingCycle,
        [ConversionSkuResultFields.COLUMN_NAME]: this.name,
        [ConversionSkuResultFields.COLUMN_SKU]: this.sku,
        [ConversionSkuResultFields.COLUMN_TERM]: this.term,
        [ConversionSkuResultFields.COLUMN_TOTAL_BUY_PRICE]: this.totalBuyPrice,
      };
    }

    return {
      [ConversionSkuResultFields.COLUMN_BILLING_CYCLE]: this.billingCycle,
      [ConversionSkuResultFields.COLUMN_END_DATE]: this.endDate,
      [ConversionSkuResultFields.COLUMN_FRIENDLY_NAME]: this.friendlyName,
      [ConversionSkuResultFields.COLUMN_LICENSE_REFERENCE]: this
        .licenseReference,
      [ConversionSkuResultFields.COLUMN_NAME]: this.name,
      [ConversionSkuResultFields.COLUMN_SEATS]: this.seats,
      [ConversionSkuResultFields.COLUMN_SKU]: this.sku,
      [ConversionSkuResultFields.COLUMN_TERM]: this.term,
      [ConversionSkuResultFields.COLUMN_TOTAL_BUY_PRICE]: this.totalBuyPrice,
    };
  }
}
