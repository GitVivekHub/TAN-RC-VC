"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let AppService = class AppService {
    constructor(httpService) {
        this.httpService = httpService;
        this.base_url = process.env.base_url;
        this.issuer_id = process.env.issuer_id;
        this.credential_schema_id = process.env.credential_schema_id;
    }
    async issueCredential(body) {
        const data = {
            credential: {
                '@context': [
                    'https://www.w3.org/2018/credentials/v1',
                    'https://tekdi.github.io/TAN-RC-VC/Context-TAN-VC.json',
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
            const response = await (0, rxjs_1.firstValueFrom)(this.httpService.post(`${this.base_url}/credentials/credentials/issue`, data, config));
            return response.data;
        }
        catch (error) {
            console.log('error--->>', error);
            return;
        }
    }
    async getCredential(id) {
        const url = `${this.base_url}/credentials/credentials/${id}`;
        const headers = {
            Accept: 'application/json',
            templateId: 'clj6oic5i0000iz4olldotf9g',
        };
        const response = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, { headers }));
        return response.data;
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], AppService);
//# sourceMappingURL=app.service.js.map