"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponseInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
let ResponseInterceptor = class ResponseInterceptor {
    intercept(ctx, next) {
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            if (data.status) {
                ctx.switchToHttp().getResponse().status(data.status);
            }
            const query = ctx.switchToHttp().getRequest().query;
            return {
                status: data === null || data === void 0 ? void 0 : data.status,
                message: data === null || data === void 0 ? void 0 : data.message,
                result: data === null || data === void 0 ? void 0 : data.result,
                pageInfo: (data === null || data === void 0 ? void 0 : data.pageInfo)
                    ? Object.assign(Object.assign({}, data.pageInfo), { isNextPage: data.pageInfo.totalResults - query.pageSize * query.page > 0 }) : undefined,
            };
        }));
    }
};
exports.ResponseInterceptor = ResponseInterceptor;
exports.ResponseInterceptor = ResponseInterceptor = __decorate([
    (0, common_1.Injectable)()
], ResponseInterceptor);
