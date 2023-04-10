import { Directus } from "@directus/sdk";
import { environment } from "environments/env";

export const directus = new Directus(environment.directusBaseUrl, {
  auth: {
    mode: 'json'
  }
})