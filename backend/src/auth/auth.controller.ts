import { Controller, Post, Body, HttpCode, HttpStatus, Headers, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('webhook')
  @HttpCode(HttpStatus.OK)
  async handleSupabaseWebhook(
    @Headers('Authorization') authHeader: string,
    @Body() payload: any
  ) {
    // Basic verification (In production, verify the webhook signature or a custom secret)
    const webhookSecret = process.env.SUPABASE_WEBHOOK_SECRET;
    if (webhookSecret && authHeader !== `Bearer ${webhookSecret}`) {
      throw new UnauthorizedException('Invalid Webhook Secret');
    }

    if (payload.type === 'INSERT' && payload.table === 'users' && payload.schema === 'auth') {
      const { id, email, raw_user_meta_data } = payload.record;
      const name = raw_user_meta_data?.full_name || raw_user_meta_data?.name;
      const avatarUrl = raw_user_meta_data?.avatar_url;

      try {
        await this.prisma.user.create({
          data: {
            supabaseUserId: id,
            email: email,
            name: name,
            avatarUrl: avatarUrl,
          },
        });
        console.log(`User created via Webhook: ${email}`);
      } catch (error) {
        console.error('Error creating user from webhook:', error);
      }
    }

    return { status: 'success' };
  }
}
