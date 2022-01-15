import { createParamDecorator, ExecutionContext, Logger } from "@nestjs/common";

export const GetUserDetails = createParamDecorator((data, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
})