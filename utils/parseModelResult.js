function parseModelResult(result) {
  try {
    // Extract the content string from the result
    const content = result.message.content;

    // Clean up the string by removing extra newlines and spaces
    const cleanedContent = content
      .replace(/\n/g, "")
      .replace(/\s+/g, " ")
      .trim();

    // Find the JSON part (between the first { and last })
    const jsonStart = cleanedContent.indexOf("{");
    const jsonEnd = cleanedContent.lastIndexOf("}");

    if (jsonStart === -1 || jsonEnd === -1) {
      throw new Error("No JSON object found in result");
    }

    const jsonString = cleanedContent.substring(jsonStart, jsonEnd + 1);

    // Parse the JSON string
    const jsonObject = JSON.parse(jsonString);

    // Return the parsed object
    return jsonObject;
  } catch (error) {
    console.error("Error parsing model result:", error);
    return null;
  }
}

module.exports = {
  parseModelResult,
};
