function getModelPrompt(contextData) {
  const parsedEmailContent =
    contextData.HtmlBody.replace(/<\/?[^>]+(>|$)/g, "") +
    "\n\n" +
    contextData.TextBody;

  const modelPrompt = `
        Analyze the following email content and extract voucher/offer details with high accuracy. Follow these rules:

        1. OUTPUT FORMAT: Return a clean JSON object with these exact keys only not any other key:
        {
        "company": "(sender/organization name)",
        "offer": "(short description with promo code if available)",
        "details": "(longer description of the offer)",
        "expiry": "(expiration date if mentioned, format as 'Month Day, Year')",
        "category": "(Food, Clothing, Electronics, Services, etc.)"
        }

        2. PROCESSING INSTRUCTIONS:
        - Prioritize information from structured elements (tables, bullet points)
        - If multiple offers exist, extract the most prominent/main one
        - For missing fields, use null (never omit keys)
        - Normalize dates to 'Month Day, Year' format (e.g., 'July 9, 2024')
        - Extract promo codes exactly as shown (case-sensitive)
        - For category, choose the most specific applicable option from [Food, Groceries, Electronics, Lifestyle, Entertainment, Transportation, Health, Others]

        3. EXAMPLE:
        {
        "company": "Amazon Prime",
        "offer": "30% Off on Groceries (Code: PRIME30)",
        "details": "Use code PRIME30 at checkout for 30% off on grocery items.",
        "expiry": "June 30, 2024",
        "category": "Groceries"
        }

        4. CONTENT TO ANALYZE:
        Parsed Email Content: ${parsedEmailContent}
    `;

  return modelPrompt;
}

module.exports = {
  getModelPrompt,
};
