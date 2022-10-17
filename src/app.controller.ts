import { Body, Controller, Get, HttpCode, HttpStatus, NotFoundException, Post, Query, Req, Res, UseFilters, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { TransformInterceptor } from './utils/transform.interceptor';
import { ValidationFilter } from './utils/validation.filter';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('getUsers')
  getUsers(): any {
    return this.appService.getUsers();
  }



  @Post('updateUser')
  @UseInterceptors(TransformInterceptor)
  async updateAuthPassword(@Body() body: any) {
    const paramKeys = Object.keys(body)
    if (!paramKeys.length) {
      throw new NotFoundException('Please send email/phoneWithCountryCode and password');
    }
    const userObj = await this.appService.getUser(paramKeys[0], body[paramKeys[0]]);
    if (!userObj.length) {
      throw new NotFoundException('User not found.');
    }
    else {
      const uId = (await this.appService.getUserUid(userObj[0].email)).uid
      const updateObj = {
        password: body[paramKeys[1]]
      }
      return this.appService.updateAuthPassword(uId, updateObj).then((res) => {
        this.appService.updateUser(userObj[0], updateObj)

        return userObj[0]
      }).catch((error) => {
        return error
      })
    }



  }
}
