import { environment } from '../environments/environments';

/**
 * getAppName
 * @param url string - app url
 * @returns string - app name
 */
export function getAppName(url: string): string {
  if (!url) return 'Weather Now';

  return Object.values(environment.apps).find((value) =>
    value.route.toLocaleLowerCase().includes(url.toLocaleLowerCase()),
  )?.name!;
}
