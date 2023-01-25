import nock from 'nock';
import { expect } from 'chai';

import {
  GetResult,
  PublicApiClient,
  Campaign,
  CampaignAssets,
  CampaignV2,
} from '../../src';
import {
  GET_ACTIVE_CAMPAIGN_OUTPUT,
  GET_ACTIVE_CAMPAIGN_OUTPUT_MINIMAL,
  GET_ACTIVE_CAMPAIGN_OUTPUT_WITHOUT_FOOTER_FEATURES,
  GET_ACTIVE_CAMPAIGN_OUTPUT_WITHOUT_LANDING,
  GET_ACTIVE_CAMPAIGN_PARAMETERS,
  GET_ACTIVE_CAMPAIGNS_V2_OUTPUT,
  GET_ACTIVE_CAMPAIGNS_V2_MINIMAL_OUTPUT,
  GET_DETAILS_CAMPAIGN_V2_OUTPUT,
  GET_DETAILS_CAMPAIGN_V2_WITHOUT_FEATURE_OUTPUT,
  GET_DETAILS_CAMPAIGN_V2_WITHOUT_FEATURE_ITEMS_OUTPUT,
  PAYLOAD_POST_CAMPAIGN_EMAIL,
  GET_DETAILS_CAMPAIGN_V2_MINIMAL_OUTPUT,
} from './mocks/campaign.mocks';
import {
  GET_CAMPAIGN_ASSETS_OUTPUT,
  GET_CAMPAIGN_ASSETS_PARAMETERS,
} from './mocks/campaignAssets.mock';
import { CampaignList } from '../../src/campaign/entities/v2/campaignList';

export const CAMPAIGN_MOCK_URL = 'https://campaign.localhost';
export const GET_ACTIVE_CAMPAIGN = new RegExp('/active.*');
export const GET_CAMPAIGN_DETAILS = new RegExp('/campaigns.*');
export const GET_CAMPAIGN_ASSETS = new RegExp('/.*./assets');
export const POST_CAMPAIGN_EMAIL = new RegExp('/.*./notify');

describe('CampaignClient', () => {
  const client = new PublicApiClient()
    .getCampaignClient()
    .setUrl(CAMPAIGN_MOCK_URL);

  describe('getActiveCampaign', () => {
    it('calls the get active campaign method with parameters', async () => {
      nock(CAMPAIGN_MOCK_URL)
        .get(GET_ACTIVE_CAMPAIGN)
        .reply(200, GET_ACTIVE_CAMPAIGN_OUTPUT);

      const response: GetResult<Campaign> = await client.getActiveCampaign(
        GET_ACTIVE_CAMPAIGN_PARAMETERS,
      );

      expect(response).to.be.instanceof(GetResult);
      expect(response.toJSON()).to.be.deep.equals(GET_ACTIVE_CAMPAIGN_OUTPUT);
    });

    it('calls the get active campaign method without parameters', async () => {
      nock(CAMPAIGN_MOCK_URL)
        .get(GET_ACTIVE_CAMPAIGN)
        .reply(200, GET_ACTIVE_CAMPAIGN_OUTPUT);

      const response: GetResult<Campaign> = await client.getActiveCampaign();

      expect(response).to.be.instanceof(GetResult);
      expect(response.toJSON()).to.be.deep.equals(GET_ACTIVE_CAMPAIGN_OUTPUT);
    });

    it('Can handle a response without landingPageBody, landingPageHeader or landingPageUrl', async () => {
      nock(CAMPAIGN_MOCK_URL)
        .get(GET_ACTIVE_CAMPAIGN)
        .reply(200, GET_ACTIVE_CAMPAIGN_OUTPUT_WITHOUT_LANDING);

      const response: GetResult<Campaign> = await client.getActiveCampaign();

      expect(response).to.be.instanceof(GetResult);
      expect(response.toJSON()).to.be.deep.equals(
        GET_ACTIVE_CAMPAIGN_OUTPUT_WITHOUT_LANDING,
      );
    });

    it('Can handle a minimal response', async () => {
      nock(CAMPAIGN_MOCK_URL)
        .get(GET_ACTIVE_CAMPAIGN)
        .reply(200, GET_ACTIVE_CAMPAIGN_OUTPUT_MINIMAL);

      const response: GetResult<Campaign> = await client.getActiveCampaign();

      expect(response).to.be.instanceof(GetResult);
      expect(response.toJSON()).to.be.deep.equals(
        GET_ACTIVE_CAMPAIGN_OUTPUT_MINIMAL,
      );
    });

    it('Can handle a response without feature on landingPageFooterFeature', async () => {
      nock(CAMPAIGN_MOCK_URL)
        .get(GET_ACTIVE_CAMPAIGN)
        .reply(200, GET_ACTIVE_CAMPAIGN_OUTPUT_WITHOUT_FOOTER_FEATURES);

      const response: GetResult<Campaign> = await client.getActiveCampaign();

      expect(response).to.be.instanceof(GetResult);
      expect(response.toJSON()).to.be.deep.equals(
        GET_ACTIVE_CAMPAIGN_OUTPUT_WITHOUT_FOOTER_FEATURES,
      );
    });
  });

  describe('getCampaignAssets', () => {
    it('calls the get campaign assets method with parameters', async () => {
      nock(CAMPAIGN_MOCK_URL)
        .get(GET_CAMPAIGN_ASSETS)
        .reply(200, GET_CAMPAIGN_ASSETS_OUTPUT);

      const response: GetResult<CampaignAssets> = await client.getCampaignAssets(
        '0ce70536-a59d-4c21-b39d-272b034367fa',
        GET_CAMPAIGN_ASSETS_PARAMETERS,
      );

      expect(response).to.be.instanceof(GetResult);
      expect(response.toJSON()).to.be.deep.equals(GET_CAMPAIGN_ASSETS_OUTPUT);
    });

    it('calls the get campaign assets method without parameters', async () => {
      nock(CAMPAIGN_MOCK_URL)
        .get(GET_CAMPAIGN_ASSETS)
        .reply(200, GET_CAMPAIGN_ASSETS_OUTPUT);

      const response: GetResult<CampaignAssets> = await client.getCampaignAssets(
        '0ce70536-a59d-4c21-b39d-272b034367fa',
      );

      expect(response).to.be.instanceof(GetResult);
      expect(response.toJSON()).to.be.deep.equals(GET_CAMPAIGN_ASSETS_OUTPUT);
    });
  });

  describe('getCampaignDetails', () => {
    it('calls the get campaign details method with parameters', async () => {
      nock(CAMPAIGN_MOCK_URL)
        .get(GET_CAMPAIGN_DETAILS)
        .reply(200, GET_ACTIVE_CAMPAIGN_OUTPUT);

      const response: GetResult<Campaign> = await client.getCampaignDetails(
        '0ce70536-a59d-4c21-b39d-272b034367fa',
      );

      expect(response).to.be.instanceof(GetResult);
      expect(response.toJSON()).to.be.deep.equals(GET_ACTIVE_CAMPAIGN_OUTPUT);
    });
  });

  describe('getActiveCampaignV2', () => {
    it('calls the get active campaign method with parameters', async () => {
      nock(CAMPAIGN_MOCK_URL)
        .get(GET_ACTIVE_CAMPAIGN)
        .reply(200, GET_ACTIVE_CAMPAIGNS_V2_OUTPUT);

      const response: GetResult<CampaignList> = await client.getActiveCampaignV2(
        GET_ACTIVE_CAMPAIGN_PARAMETERS,
      );

      expect(response).to.be.instanceof(GetResult);
      expect(response.toJSON()).to.be.deep.equals(
        GET_ACTIVE_CAMPAIGNS_V2_OUTPUT,
      );
    });

    it('calls the get active campaign method without parameters', async () => {
      nock(CAMPAIGN_MOCK_URL)
        .get(GET_ACTIVE_CAMPAIGN)
        .reply(200, GET_ACTIVE_CAMPAIGNS_V2_OUTPUT);

      const response: GetResult<CampaignList> = await client.getActiveCampaignV2();

      expect(response).to.be.instanceof(GetResult);
      expect(response.toJSON()).to.be.deep.equals(
        GET_ACTIVE_CAMPAIGNS_V2_OUTPUT,
      );
    });

    it('Can handle a minimal response', async () => {
      nock(CAMPAIGN_MOCK_URL)
        .get(GET_ACTIVE_CAMPAIGN)
        .reply(200, GET_ACTIVE_CAMPAIGNS_V2_MINIMAL_OUTPUT);

      const response: GetResult<CampaignList> = await client.getActiveCampaignV2();

      expect(response).to.be.instanceof(GetResult);
      expect(response.toJSON()).to.be.deep.equals(
        GET_ACTIVE_CAMPAIGNS_V2_MINIMAL_OUTPUT,
      );
    });
  });

  describe('getCampaignDetailsV2', () => {
    it('calls the get campaign details method with parameters', async () => {
      nock(CAMPAIGN_MOCK_URL)
        .get(GET_CAMPAIGN_DETAILS)
        .reply(200, GET_DETAILS_CAMPAIGN_V2_OUTPUT);

      const response: GetResult<CampaignV2> = await client.getCampaignDetailsV2(
        '0ce70536-a59d-4c21-b39d-272b034367fa',
      );

      expect(response).to.be.instanceof(GetResult);
      expect(response.toJSON()).to.be.deep.equals(
        GET_DETAILS_CAMPAIGN_V2_OUTPUT,
      );
    });

    it('Can handle a minimal response', async () => {
      nock(CAMPAIGN_MOCK_URL)
        .get(GET_CAMPAIGN_DETAILS)
        .reply(200, GET_DETAILS_CAMPAIGN_V2_MINIMAL_OUTPUT);

      const response: GetResult<CampaignV2> = await client.getCampaignDetailsV2(
        '0ce70536-a59d-4c21-b39d-272b034367fa',
      );

      expect(response).to.be.instanceof(GetResult);
      expect(response.toJSON()).to.be.deep.equals(
        GET_DETAILS_CAMPAIGN_V2_MINIMAL_OUTPUT,
      );
    });

    it('calls the get campaign details without feature', async () => {
      nock(CAMPAIGN_MOCK_URL)
        .get(GET_CAMPAIGN_DETAILS)
        .reply(200, GET_DETAILS_CAMPAIGN_V2_WITHOUT_FEATURE_OUTPUT);

      const response: GetResult<CampaignV2> = await client.getCampaignDetailsV2(
        '0ce70536-a59d-4c21-b39d-272b034367fa',
      );

      expect(response).to.be.instanceof(GetResult);
      expect(response.toJSON()).to.be.deep.equals(
        GET_DETAILS_CAMPAIGN_V2_WITHOUT_FEATURE_OUTPUT,
      );
    });

    it('calls the get campaign details without feature items', async () => {
      nock(CAMPAIGN_MOCK_URL)
        .get(GET_CAMPAIGN_DETAILS)
        .reply(200, GET_DETAILS_CAMPAIGN_V2_WITHOUT_FEATURE_ITEMS_OUTPUT);

      const response: GetResult<CampaignV2> = await client.getCampaignDetailsV2(
        '0ce70536-a59d-4c21-b39d-272b034367fa',
      );

      expect(response).to.be.instanceof(GetResult);
      expect(response.toJSON()).to.be.deep.equals(
        GET_DETAILS_CAMPAIGN_V2_WITHOUT_FEATURE_ITEMS_OUTPUT,
      );
    });
  });

  describe('postCampaignEmail', () => {
    it('calls the post campaign email method with parameters', async () => {
      nock(CAMPAIGN_MOCK_URL).post(POST_CAMPAIGN_EMAIL).reply(204);

      await client.postCampaignEmail(
        '0ce70536-a59d-4c21-b39d-272b034367fa',
        PAYLOAD_POST_CAMPAIGN_EMAIL,
      );

      expect(nock.isDone()).to.be.true;
    });
  });
});
