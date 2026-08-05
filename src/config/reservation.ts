// Room reservation form (Microsoft Forms, semmelweisklinik.at tenant).
//
// Temporarily disabled. The form accepts submissions without error, but we
// have not yet traced where the responses land inside the M365 tenant, so
// room pages fall back to a mailto: programm@semmelweisklinik.at instead of
// sending visitors into a form nobody is monitoring. The URL is kept here so
// it can be restored unchanged.
//
// To restore: set RESERVATION_FORM_ENABLED to true. Nothing else to change —
// both the English and German room pages switch back to the form link.
export const RESERVATION_FORM_ENABLED = false;

export const RESERVATION_FORM_URL =
  "https://forms.cloud.microsoft/pages/responsepage.aspx?id=k4T7IDJCqkGd0n-P_3sfEFN5efuep7RNp8DZIoA20jBUNVZaVERaTFRaQjlTTFc3UEJaQlNJQk1VVS4u&route=shorturl";
