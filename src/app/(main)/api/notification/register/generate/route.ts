import { NextRequest, NextResponse } from "next/server"
// import dayjs from "dayjs";
import webpush from "web-push"

// const badRequest = (message?: string) => new Response(message || 'Bad Request', { status: 400 })
export const dynamic = "force-dynamic"
export async function GET(request: NextRequest, params: any) {

  // const configManager = await IOC().resolve<IConfigManager>('ConfigManager')
  // const secret = await configManager.get('JWT_KEY');

  // const { ip } = request

  // const timestamp = dayjs().unix()

  // let token = jwt.sign({ ip: ip || timestamp, timestamp: timestamp }, secret, {
  //   expiresIn: '1h',
  //   algorithm: 'HS256',
  // })

  // const { privateKey, publicKey } = crypto.generateKeyPairSync('ec', { namedCurve: 'sect233k1' })

  const vapidKeys = webpush.generateVAPIDKeys();

  // const sign = crypto.createSign('SHA256');
  // sign.update(token);
  // sign.end();
  // const signature = sign.sign(privateKey);

  // const verify = crypto.createVerify('SHA256');
  // verify.update(token);
  // verify.end();

  // const sig = signature.toString('base64')
  // .replace(/=/g, '')

  // remove equals sign



  // cookies().set('nid', sig)

  // console.log('signature:', sig)
  const res = NextResponse.json({ api_key: vapidKeys.publicKey })

  return res
}


