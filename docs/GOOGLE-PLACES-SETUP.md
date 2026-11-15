# Google Maps facility photos and live scores

Prepared at the user's request; currently disabled. No API project/key was available and no Place IDs have been guessed. Existing public-source ratings and directory pages work without Google.

## Enable

1. In the site's Google Cloud project, enable Maps JavaScript API and Places API (New), with billing and an appropriate quota/budget. Create a browser key restricted to those APIs and the production HTTP referrer `https://vetlas.thatvetguy.net/*`. Add explicit development/preview referrers only if needed; do not use a wildcard for all hosts.
2. Set `PUBLIC_GOOGLE_MAPS_BROWSER_KEY` in the Cloudflare **build** environment. This browser key is intentionally visible to clients; never put an unrestricted/server key here. Do not commit a key. Rebuild after configuring it.
3. Use Google's Place ID Finder to match each exact branch. Compare business name, street address, branch and phone; shared phone numbers do not merge branches. Store only reviewed IDs in `src/data/google-places.json`, keyed by provider ID:

   ```json
   {
     "indore-myra-usha": {
       "placeId": "REPLACE_WITH_REVIEWED_PLACE_ID",
       "sourceUrl": "https://www.google.com/maps/?cid=REPLACE_WITH_MATCHED_LISTING",
       "checkedAt": "2026-11-15"
     }
   }
   ```

4. Run build/check/data tests, then verify actual production photos, complete author credits, address matches, Google Maps attribution and rating source links. The browser key and mappings both must exist for any API call to run.

## Behavior and limitations

- One Places details request per visible place per page, shared by duplicate cards. Photos are fetched using the current SDK `Photo.getURI`; all returned author attributions are displayed. No photo references, photo bytes or live ratings are written into static JSON or local storage.
- Live Google Maps ratings update the displayed platform mean without summing review counts. Static discovery sorting initially uses indexed snapshots; live values update the card's sort value for the next explicit sort/filter. Changes do not reorder cards while a reader is looking at them.
- Missing photos, API errors, quota exhaustion, invalid keys and slow loads retain the labelled placeholder and outgoing Maps link. No invented fallback photo.
- The first API photo is from the matched listing; it is not guaranteed to be an exterior. Review actual results before activation. Do not imply that a generated or unrelated image depicts the facility.
- Production Google calls could not be tested without a configured project. Browser tests exercise mocked success, missing-photo and failure responses; a real API smoke test remains an activation requirement.
- Review Google's current attribution and display requirements at activation, including any regional terms. Publish the applicable site privacy/terms notices before enabling Google services.

References: [Place Photos](https://developers.google.com/maps/documentation/javascript/place-photos), [Places policies](https://developers.google.com/maps/documentation/places/web-service/policies), [Place IDs](https://developers.google.com/maps/documentation/places/web-service/place-id).

## Reproduce validation

Run `npm run check`, `npm run build`, `npm run check:directory` and `npm run test:ratings`. For browser checks, install the optional runner with `npm install --no-save --package-lock=false playwright`, provide Chromium at `/usr/bin/chromium` (or set `CHROMIUM_PATH`), and run `npm run preview -- --host 127.0.0.1 --port 4323` in one terminal, then `npm run test:browser` in another. Tests block external requests and inject mock Google responses; they do not incur Places charges or prove live access. `VETLAS_SCREENSHOT` optionally writes a mobile screenshot.
