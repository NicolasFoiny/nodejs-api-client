import nock from 'nock';

import {
  APIResponseCustomerUpdated,
  APIResponseError,
  APIResponseResourceCreated,
  CustomerContactFields,
  DataInvitationFields,
  GetResult,
  GetResultFields,
  Parameters,
  PostCustomerMigrationPayload,
  PostCustomerPayload,
  PublicApiClient,
} from '../../src/';
import { expect } from 'chai';
import { PAYLOAD_ORDERS } from '../orders/mocks/orders.mocks';
import {
  PAYLOAD_CUSTOMER_CONTACT,
  PAYLOAD_GET_CUSTOMER_CONTACT_LIST,
  PAYLOAD_GET_CUSTOMER_INVITATION,
  PAYLOAD_GET_CUSTOMERS,
  PAYLOAD_GET_CUSTOMERS_WITHOUT_OPTIONAL_FIELDS,
  PAYLOAD_POST_CUSTOMER_INVITATION,
  RESPONSE_CUSTOMER_CONTACT,
} from './mocks/customers.mocks';
import { Axios } from 'axios';
import sinon from 'sinon';
import { cloneDeep } from 'lodash';

export const CUSTOMERS_MOCK_URL = 'https://customers.localhost';
export const CUSTOMERS_GET_CUSTOMERS_URL = new RegExp('/customers.*');
export const CUSTOMERS_GET_CUSTOMERS_ORDERS_URL = new RegExp(
  '/customers/REF/orders.*',
);
export const CUSTOMERS_GET_CUSTOMER_INVITATION_URL = new RegExp(
  '/customers/invitations.*',
);

export const CUSTOMERS_GET_CUSTOMER_CONTACT_URL = new RegExp(
  '/customers/REF/contacts.*',
);
export const CUSTOMERS_POST_CUSTOMERS_MIGRATION_URL = new RegExp(
  '/customers/REF/migration',
);

describe('CustomersClients', () => {
  describe('getCustomers', () => {
    const client = new PublicApiClient()
      .getCustomersClient()
      .setUrl(CUSTOMERS_MOCK_URL);

    it('call get method without parameters', async () => {
      nock(CUSTOMERS_MOCK_URL)
        .get(CUSTOMERS_GET_CUSTOMERS_URL)
        .reply(200, PAYLOAD_GET_CUSTOMERS);

      const result = await client.getCustomers();
      expect(result).to.be.instanceof(GetResult);
      expect(result.toJSON()).to.eql(PAYLOAD_GET_CUSTOMERS);
    });

    it('call get method with parameters', async () => {
      nock(CUSTOMERS_MOCK_URL)
        .get(CUSTOMERS_GET_CUSTOMERS_URL)
        .reply(200, PAYLOAD_GET_CUSTOMERS);

      const parameters: Parameters = {
        email: 'test.test@test.test',
      };
      const result = await client.getCustomers(parameters);
      expect(result).to.be.instanceof(GetResult);
      expect(result.toJSON()).to.eql(PAYLOAD_GET_CUSTOMERS);
    });

    it('call get method without parameters and without optional fields', async () => {
      nock(CUSTOMERS_MOCK_URL)
        .get(CUSTOMERS_GET_CUSTOMERS_URL)
        .reply(200, PAYLOAD_GET_CUSTOMERS_WITHOUT_OPTIONAL_FIELDS);

      const result = await client.getCustomers();
      expect(result).to.be.instanceof(GetResult);
      expect(result.toJSON()).to.eql(
        PAYLOAD_GET_CUSTOMERS_WITHOUT_OPTIONAL_FIELDS,
      );
    });

    it('call get method with parameters and without optional fields', async () => {
      nock(CUSTOMERS_MOCK_URL)
        .get(CUSTOMERS_GET_CUSTOMERS_URL)
        .reply(200, PAYLOAD_GET_CUSTOMERS_WITHOUT_OPTIONAL_FIELDS);

      const parameters: Parameters = {
        email: 'test.test@test.test',
      };
      const result = await client.getCustomers(parameters);
      expect(result).to.be.instanceof(GetResult);
      expect(result.toJSON()).to.eql(
        PAYLOAD_GET_CUSTOMERS_WITHOUT_OPTIONAL_FIELDS,
      );
    });
  });

  describe('getCustomerByRef', () => {
    const client = new PublicApiClient()
      .getCustomersClient()
      .setUrl(CUSTOMERS_MOCK_URL);

    const ref = 'ref';

    it('call get method without parameters', async () => {
      nock(CUSTOMERS_MOCK_URL)
        .get(CUSTOMERS_GET_CUSTOMERS_URL)
        .reply(200, PAYLOAD_GET_CUSTOMERS);

      const result = await client.getCustomerByRef(ref);
      expect(result).to.be.instanceof(GetResult);
      expect(result.toJSON()).to.eql(PAYLOAD_GET_CUSTOMERS);
    });

    it('call get method with parameters', async () => {
      nock(CUSTOMERS_MOCK_URL)
        .get(CUSTOMERS_GET_CUSTOMERS_URL)
        .reply(200, PAYLOAD_GET_CUSTOMERS);

      const parameters: Parameters = {
        email: 'test.test@test.test',
      };
      const result = await client.getCustomerByRef(ref, parameters);
      expect(result).to.be.instanceof(GetResult);
      expect(result.toJSON()).to.eql(PAYLOAD_GET_CUSTOMERS);
    });
  });

  describe('getCustomerOrders', () => {
    const client = new PublicApiClient()
      .getCustomersClient()
      .setUrl(CUSTOMERS_MOCK_URL);

    it('call get customer orders method with parameters', async () => {
      nock(CUSTOMERS_MOCK_URL)
        .get(CUSTOMERS_GET_CUSTOMERS_ORDERS_URL)
        .reply(200, PAYLOAD_ORDERS);

      const parameters: Parameters = {
        from: '2021-10-29',
        order_by: 'ASC',
        sort_by: 'status',
      };
      const page = 2;
      const per_page = 5;
      const customerRef = 'REF';
      const result = await client.getCustomerOrders(
        customerRef,
        per_page,
        page,
        parameters,
      );

      expect(result).to.be.instanceof(GetResult);
      expect(result.toJSON()).to.eql(PAYLOAD_ORDERS);
    });

    it('Should get customer list orders without parameters', async () => {
      nock(CUSTOMERS_MOCK_URL)
        .get(CUSTOMERS_GET_CUSTOMERS_ORDERS_URL)
        .reply(200, PAYLOAD_ORDERS);

      const customerRef = 'REF';

      const result = await client.getCustomerOrders(customerRef);
      expect(result).to.be.instanceof(GetResult);
      expect(result.toJSON()).to.eql(PAYLOAD_ORDERS);
    });
  });

  describe('getCustomerInvitation', () => {
    const client = new PublicApiClient()
      .getCustomersClient()
      .setUrl(CUSTOMERS_MOCK_URL);

    it('call get customer invitation method with invitation code', async () => {
      nock(CUSTOMERS_MOCK_URL)
        .get(CUSTOMERS_GET_CUSTOMER_INVITATION_URL)
        .reply(200, PAYLOAD_GET_CUSTOMER_INVITATION);

      const result = await client.getCustomerInvitation(
        PAYLOAD_GET_CUSTOMER_INVITATION[GetResultFields.COLUMN_DATA][
          DataInvitationFields.COLUMN_CODE
        ],
      );

      expect(result).to.be.instanceof(GetResult);
      expect(result.toJSON()).to.eql(PAYLOAD_GET_CUSTOMER_INVITATION);
    });
  });

  describe('getCustomerContactList', () => {
    const client = new PublicApiClient()
      .getCustomersClient()
      .setUrl(CUSTOMERS_MOCK_URL);

    it('call get customer contact list', async () => {
      nock(CUSTOMERS_MOCK_URL)
        .get(CUSTOMERS_GET_CUSTOMER_CONTACT_URL)
        .reply(200, PAYLOAD_GET_CUSTOMER_CONTACT_LIST);

      const result = await client.getCustomerContactList('REF');

      expect(result).to.be.instanceof(GetResult);
      expect(result.toJSON()).to.eql(PAYLOAD_GET_CUSTOMER_CONTACT_LIST);
    });
  });

  describe('postCustomerContact', () => {
    const client = new PublicApiClient()
      .getCustomersClient()
      .setUrl(CUSTOMERS_MOCK_URL);

    it('call post to create new customer contact', async () => {
      nock(CUSTOMERS_MOCK_URL)
        .post(CUSTOMERS_GET_CUSTOMER_CONTACT_URL)
        .reply(200, RESPONSE_CUSTOMER_CONTACT);

      const result = await client.postCustomerContact(
        'REF',
        PAYLOAD_CUSTOMER_CONTACT,
      );

      expect(result).to.be.instanceof(GetResult);
      expect(result.toJSON()).to.eql(RESPONSE_CUSTOMER_CONTACT);
    });
  });

  describe('getCustomerContact', () => {
    const client = new PublicApiClient()
      .getCustomersClient()
      .setUrl(CUSTOMERS_MOCK_URL);

    it('call get customer contact details', async () => {
      nock(CUSTOMERS_MOCK_URL)
        .get(CUSTOMERS_GET_CUSTOMER_CONTACT_URL)
        .reply(200, RESPONSE_CUSTOMER_CONTACT);

      const result = await client.getCustomerContact('REF', 'REF');

      expect(result).to.be.instanceof(GetResult);
      expect(result.toJSON()).to.eql(RESPONSE_CUSTOMER_CONTACT);
    });

    it('call get customer contact details without xcp invitation', async () => {
      const response = cloneDeep(RESPONSE_CUSTOMER_CONTACT);
      delete response.data[CustomerContactFields.COLUMN_XCP_INVITATION];

      nock(CUSTOMERS_MOCK_URL)
        .get(CUSTOMERS_GET_CUSTOMER_CONTACT_URL)
        .reply(200, response);

      const result = await client.getCustomerContact('REF', 'REF');

      expect(result).to.be.instanceof(GetResult);
      expect(result.toJSON()).to.eql(response);
    });

    it('call get customer contact details with empty xcp invitation values', async () => {
      const response = cloneDeep(RESPONSE_CUSTOMER_CONTACT);
      response.data.xcpInvitation = {};

      nock(CUSTOMERS_MOCK_URL)
        .get(CUSTOMERS_GET_CUSTOMER_CONTACT_URL)
        .reply(200, response);

      const result = await client.getCustomerContact('REF', 'REF');

      expect(result).to.be.instanceof(GetResult);
      expect(result.toJSON()).to.eql(response);
    });
  });

  describe('patchCustomerContact', () => {
    const client = new PublicApiClient()
      .getCustomersClient()
      .setUrl(CUSTOMERS_MOCK_URL);

    it('call patch to update customer contact', async () => {
      nock(CUSTOMERS_MOCK_URL)
        .patch(CUSTOMERS_GET_CUSTOMER_CONTACT_URL)
        .reply(200, RESPONSE_CUSTOMER_CONTACT);

      const result = await client.patchCustomerContact(
        'REF',
        'REF',
        PAYLOAD_CUSTOMER_CONTACT,
      );

      expect(result).to.be.instanceof(GetResult);
      expect(result.toJSON()).to.eql(RESPONSE_CUSTOMER_CONTACT);
    });
  });

  describe('deleteCustomerContact', () => {
    const client = new PublicApiClient()
      .getCustomersClient()
      .setUrl(CUSTOMERS_MOCK_URL);

    it('call patch to update customer contact', async () => {
      nock(CUSTOMERS_MOCK_URL)
        .delete(CUSTOMERS_GET_CUSTOMER_CONTACT_URL)
        .reply(200);

      await client.deleteCustomerContact('REF', 'REF');
    });
  });

  describe('createCustomer', () => {
    const client = new PublicApiClient()
      .getCustomersClient()
      .setUrl(CUSTOMERS_MOCK_URL);

    let axiosClient: sinon.SinonStubbedInstance<Axios>;

    const customerPayload: PostCustomerPayload = {
      CompanyName: 'Company test 1',
      AddressLine1: 'Address 1',
      City: 'Paris',
      CountryCode: 'FR',
      Zip: '75012',
      ReceptionPhone: '1234567890',
    };

    beforeEach(() => {
      axiosClient = sinon.stub(Axios.prototype);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('call create customer should succeed', async () => {
      const publicAPIResult = {
        status: 201,
        data: {
          data: {
            reference: 'XSP123',
          },
          status: 201,
        },
      };

      const expectedResult: APIResponseResourceCreated = publicAPIResult.data;

      axiosClient.request.resolves(publicAPIResult);

      const result = await client.createCustomer(customerPayload, {}, true);

      expect(result).to.be.deep.equals(expectedResult);
    });

    it('call create customer should fail', async () => {
      customerPayload.CompanyName = '';

      const expectedResult: APIResponseError = {
        status: 400,
        error: 'Bad value for CompanyName',
      };

      axiosClient.request.resolves({
        status: 400,
        data: {
          error: 'Bad value for CompanyName',
          status: 400,
        },
      });

      const result = await client.createCustomer(customerPayload, {}, true);

      expect(result).to.be.deep.equals(expectedResult);
    });
  });

  describe('updateCustomer', () => {
    const client = new PublicApiClient()
      .getCustomersClient()
      .setUrl(CUSTOMERS_MOCK_URL);

    let axiosClient: sinon.SinonStubbedInstance<Axios>;

    const customerPayload: Partial<PostCustomerPayload> = {
      CompanyName: 'Company test 1',
      AddressLine1: 'Address 1',
      AddressLine2: 'Address 2',
    };

    beforeEach(() => {
      axiosClient = sinon.stub(Axios.prototype);
    });

    afterEach(() => {
      sinon.restore();
    });

    it('call update customer should succeed', async () => {
      const publicAPIResult = {
        status: 200,
        data: {
          data: {
            customers: [
              {
                Reference: 'XSP123',
                WorkgroupCode: 'FR',
                CompanyName: 'Company Test 1',
                CompanyAcronym: 'CMPNTEST1',
                PartnerCompanyId: '',
                AddressLine1: 'Address 1',
                AddressLine2: 'Address 2',
                Zip: '75012',
                City: 'Paris',
                CountryCode: 'FR',
                State: '',
                ReceptionPhone: '1234567890',
                WebsiteUrl: 'www.mycompany.com',
                EmailContact: 'contact@mycompany.com',
                Headcount: 0,
                TaxNumber: '',
                Ref: '',
                RegistrationNumber: '0A1B2C3D4E5F6G7H8I9J',
                BillingId: '',
                Type: 'MSP',
                InternalReference: '',
                Contact: {
                  FirstName: 'Me',
                  LastName: 'Name',
                  Email: 'contact@mycompany.com',
                  Phone: '1234567890',
                  ContactPersonID: '',
                  SyncPartnerContactRefId: 2455703,
                },
                Details: {},
              },
            ],
          },
          status: 200,
        },
      };

      const expectedResult: APIResponseCustomerUpdated = publicAPIResult.data;

      axiosClient.request.resolves(publicAPIResult);

      const result = await client.updateCustomer(
        'XSP123',
        customerPayload,
        {},
        true,
      );

      expect(result).to.be.deep.equals(expectedResult);
    });

    it('call update customer should fail', async () => {
      customerPayload.CompanyName = '';

      const expectedResult: APIResponseError = {
        status: 400,
        error: 'Bad value for CompanyName',
      };

      axiosClient.request.resolves({
        status: 400,
        data: {
          error: 'Bad value for CompanyName',
          status: 400,
        },
      });

      const result = await client.updateCustomer(
        'XSP123',
        customerPayload,
        {},
        true,
      );

      expect(result).to.be.deep.equals(expectedResult);
    });
  });

  describe('postCustomerInvitation', () => {
    const client = new PublicApiClient()
      .getCustomersClient()
      .setUrl(CUSTOMERS_MOCK_URL);

    it('call post customer invitation method to create an invitation', async () => {
      nock(CUSTOMERS_MOCK_URL)
        .post(CUSTOMERS_GET_CUSTOMER_INVITATION_URL)
        .reply(200, PAYLOAD_GET_CUSTOMER_INVITATION);

      const result = await client.postCustomerInvitation(
        PAYLOAD_POST_CUSTOMER_INVITATION,
      );

      expect(result).to.be.instanceof(GetResult);
      expect(result.toJSON()).to.eql(PAYLOAD_GET_CUSTOMER_INVITATION);
    });
  });

  describe('postCustomerMigration', () => {
    const client = new PublicApiClient()
      .getCustomersClient()
      .setUrl(CUSTOMERS_MOCK_URL);

    const migrationPayload: PostCustomerMigrationPayload = {
      program: 'program',
    };

    it('call post customer migration method to create a migration', async () => {
      nock(CUSTOMERS_MOCK_URL)
        .post(CUSTOMERS_POST_CUSTOMERS_MIGRATION_URL)
        .reply(202);

      const result = await client.postCustomerMigration(
        'REF',
        migrationPayload,
        {},
      );

      expect(result).to.equal('');
    });

    it('call migration customer should fail', async () => {
      const expectedResult: APIResponseError = {
        status: 400,
        error: 'Bad value for program',
      };

      nock(CUSTOMERS_MOCK_URL)
        .post(CUSTOMERS_POST_CUSTOMERS_MIGRATION_URL)
        .reply(400, expectedResult);

      try {
        await client.postCustomerMigration('REF', migrationPayload, {});
      } catch (error) {
        expect((error as Error).message).to.equal(
          'Error: status code: 400. URL: https://customers.localhost',
        );
      }
    });
  });
});
