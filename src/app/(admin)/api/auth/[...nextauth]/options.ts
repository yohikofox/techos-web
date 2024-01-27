import { NextAuthOptions, Session } from 'next-auth';
import Auth0Provider from "next-auth/providers/auth0";
import { IOC } from "R/src/infrastructure/container";

import { IConfigManager } from '@/infrastructure/adapter/configManager';
import SessionConstants from '@/lib/constants/session';

// import CustomSession from '@/types/session';
// import CmsUser from '@/types/user';
// import { GetAllTenantsUseCase } from '@/useCase/tenant/getAllTenants.usecase';
// import { isAfter } from 'date-fns';
// import Tenant from 'domain/src/Tenant/tenant.model';
// import TenantAdapter from 'infrastructure/domain/tenant/tenant.adapter';
// import TenantRepository from 'infrastructure/domain/tenant/tenant.repository';
// import KeycloakProvider from 'next-auth/providers/keycloak';

// const getProviders = async () => {
//   const usecase = new GetAllTenantsUseCase(new TenantAdapter(new TenantRepository()));
//   const providers = await usecase.handle();

//   return providers.Value;
// };

export const getAuthOptions: () => Promise<NextAuthOptions> =
  async (): Promise<NextAuthOptions> => {

    const configManager = await IOC().resolve<IConfigManager>('Helper/TokenGenerator');

    const config = {
      clientId: (await configManager.get("AUTH0_CLIENT_ID", "MISSING"))!,//process.env.AUTH0_CLIENT_ID
      clientSecret: (await configManager.get("AUTH0_CLIENT_SECRET", "MISSING"))!,//process.env.AUTH0_CLIENT_SECRET,
      issuer: (await configManager.get("AUTH0_ISSUER", "MISSING"))!,//process.env.AUTH0_ISSUER
    }


    const providers = [
      Auth0Provider(config)
    ]

    return {
      pages: {
        // signIn: '/login',
      },
      session: {
        maxAge: SessionConstants.MAX_AGE,
      },
      providers,
      callbacks: {
        async session({ session, token }: { session: Session; token: any }) {
          return session;
        },
        async jwt({ token, account, profile, trigger }) {
          console.log('account:', token, account, profile, trigger)
          // if (account || trigger === 'update') {
          //   const newToken = { ...token, ...account };
          //   const cmsUserResponse = await fetch(`${process.env.WEB_USER_API_BASE_URL}/users`, {
          //     method: 'GET',
          //     headers: {
          //       'Content-Type': 'application/json',
          //       accept: 'application/json',
          //       token: (account?.access_token ?? token.access_token) as string,
          //     },
          //     cache: 'no-cache',
          //   });

          //   const cmsUser: CmsUser = await cmsUserResponse.json();

          //   newToken.user = cmsUser;

          //   return newToken;
          // }

          // const exp = new Date((token.expires_at as number) * 1000);

          // if (isAfter(new Date(), exp)) {
          //   let newToken = { ...token };
          //   const body = { refresh_token: token.refresh_token };

          //   const refreshResponse = await fetch(`${process.env.WEB_USER_API_BASE_URL}/refresh?realm=${token.provider}`, {
          //     method: 'POST',
          //     headers: {
          //       'Content-Type': 'application/json',
          //       accept: 'application/json',
          //       token: token.access_token as string,
          //     },
          //     body: JSON.stringify(body),
          //     cache: 'no-cache',
          //   });

          //   const refreshedToken = await refreshResponse.json();

          //   newToken = { ...newToken, ...refreshedToken };
          //   return newToken;
          // }
          return token;
        },
      },
    };
  };

