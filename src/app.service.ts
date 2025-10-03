import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  private readonly base_url = process.env.base_url;
  private readonly issuer_id = process.env.issuer_id;
  private readonly credential_schema_id = process.env.credential_schema_id;
  constructor(private readonly httpService: HttpService) {}

  async issueCredential(body): Promise<any> {
    const data = {
      credential: {
        '@context': [
          'https://www.w3.org/2018/credentials/v1',
          'https://gitvivekhub.github.io/TAN-RC-VC/Context-TAN-VC.json',
        ],
        type: ['VerifiableCredential'],
        issuer: this.issuer_id,
        issuanceDate: '2025-09-25T11:56:27.259Z',
        expirationDate: '2027-02-08T11:56:27.259Z',
        credentialSubject: {
          id: 'did:rcw:6b9d7b31-bc7f-454a-be30-b6c7447b1cff',
          type: 'TANCredentialsCertificate',
          first_name: body?.first_name,
          last_name: body?.last_name,
          user_type: body?.user_type,
          salutation: body?.salutation,
          email: body?.email,
          techmahindra_partner: body?.techmahindra_partner,
          organisation_name: body?.organisation_name,
          legal_name: body?.legal_name,
          designation: body?.designation,
          pan: body?.pan,
          aadhar: body?.aadhar,
          gst: body?.gst,
          org_logo: body?.org_logo,
          yoe: body?.yoe,
          registration_type: body?.registration_type,
          category: body?.category,
          address: body?.address,
          state: body?.state,
          district: body?.district,
          city: body?.city,
          pincode: body?.pincode,
          service_details: body?.service_details,
        },
      },
      credentialSchemaId: this.credential_schema_id,
      credentialSchemaVersion: '1.0.0',
      tags: ['tag1', 'tag2', 'tag3'],
      method: 'cbse',
    };

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
      maxBodyLength: Infinity,
    };

    try {
      // console.log('issue credential payload', data);
      const response = await firstValueFrom(
        this.httpService.post(
          `${this.base_url}/credentials/credentials/issue`,
          data,
          config,
        ),
      );

      return response.data;
    } catch (error) {
      console.log('error--->>', error);
      return;
    }
  }

  async getCredential(id: string): Promise<any> {
    const url = `${this.base_url}/credentials/credentials/${id}`;
    const headers = {
      Accept: 'application/json',
      templateId: 'clj6oic5i0000iz4olldotf9g',
    };

    const response = await firstValueFrom(
      this.httpService.get(url, { headers }),
    );
    return response.data; // just the data, no HTML
  }
}
