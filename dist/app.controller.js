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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppController = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const path = require("path");
const Handlebars = require("handlebars");
const fs = require("fs");
const puppeteer = require("puppeteer");
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    async issueCredential(body) {
        return this.appService.issueCredential(body);
    }
    async getCredentialPdf(id, res) {
        const credential = await this.appService.getCredential(id);
        const subject = credential.credentialSubject;
        const templatePath = path.join(__dirname, '..', 'views', 'credential.hbs');
        const templateContent = fs.readFileSync(templatePath, 'utf-8');
        const template = Handlebars.compile(templateContent);
        const logoPath = path.resolve(__dirname, '..', '..', 'TAN-RC-VC', 'assets', 'logoWithoutBackground-B12Zn0N7.png');
        const logoData = fs.readFileSync(logoPath).toString('base64');
        const logoMimeType = 'image/png';
        const logoBase64 = `data:${logoMimeType};base64,${logoData}`;
        const html = template({ credential, subject, logoBase64 });
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        });
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        const pdfBuffer = await page.pdf({
            width: '210mm',
            height: await page.evaluate(() => document.body.scrollHeight + 'px'),
            printBackground: true,
        });
        await browser.close();
        res.set({
            'Content-Type': 'application/pdf',
            'Content-Disposition': `inline; filename=credential-${id}.pdf`,
            'Content-Length': pdfBuffer.length,
        });
        res.end(pdfBuffer);
    }
};
exports.AppController = AppController;
__decorate([
    (0, common_1.Post)('issue-credential'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "issueCredential", null);
__decorate([
    (0, common_1.Get)('credentials/:id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AppController.prototype, "getCredentialPdf", null);
exports.AppController = AppController = __decorate([
    (0, common_1.Controller)('tan-vc'),
    __metadata("design:paramtypes", [app_service_1.AppService])
], AppController);
//# sourceMappingURL=app.controller.js.map