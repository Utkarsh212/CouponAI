This is a submission for the [Postmark Challenge: Inbox Innovators](https://dev.to/challenges/postmark).

## What I Built 
I built **CouponAI**, a server-side application that automates the extraction of promotional offers, deals, and coupons from your inbox using **Postmark’s inbound email parsing** feature.

Many of us receive dozens of marketing and promotional emails every day from services like Swiggy, Zomato, Uber, Ola, e-commerce brands, and more. While these emails often contain valuable discounts and promo codes, they’re easy to miss or forget when we actually need them.

**CouponAI** solves this problem by allowing users to automatically forward promotional emails to a custom inbound server **email address for parsing (powered by Postmark)**. From there, the parsed emails are processed with the help of a local LLM (Large Language Model) to extract structured information like:

- The company or brand
- Offer
- Offer description
- Expiry date
- Category (e.g., food, travel, shopping)

This data is then stored in a MongoDB database and can be retrieved via a simple frontend interface, helping users quickly check which discounts are available to them before making purchases or placing orders.

*You can now retrieve all usable offers from a single endpoint and never miss a discount again!!*

## Demo 
![Demo Video Link](https://github.com/Utkarsh212/CouponAI/blob/main/docs/images/CoupounAI.gif)

As this project depends on a locally hosted Large Language Model (LLM) to process parsed email data — which would be costly to deploy in the cloud — it is currently not live.
However, you can run and test it on your local machine by following a few simple steps outlined below:

### How to Run and Test Locally
You can try this project on your local machine by following these steps:
1. **Clone the Repository and Install dependencies** 
   ```bash
	git clone https://github.com/Utkarsh212/CouponAI.git
	cd CouponAI
    npm install
   ```

2. **Install and Run Ollama**
	- You can download it from [here](https://ollama.com/download)
	- I have used `gemma3:4b` you can choose any suitable model as per your 		needs. 
	```shell
	ollama run <YOUR_MODEL_NAME>
	```

3. **Configure Environment Variables**
		Update `config.env` with the following variables:
	```
	PORT=5000
	MODEL=YOUR_MODEL_NAME // Add your model name here
	HOSTED_MODEL_URL=http://127.0.0.1:11434/api/chat
	DB_CONNECTION_URL=YOUR_DB_CONNECTION_STRING // Add your MongoDB connection string here
	```

4. **Expose the App with ngrok**
	- You can download Ngrok from [here](https://ngrok.com/downloads/windows) 
	- Run your Express app (e.g., on port 5000)
    - Start ngrok to expose it:
	```shell
	ngrok http 5000
	```

5. **Configure Ngrok URL over Postmark**
   - Add ngrok URL to your server's settings page or using the InboundHookUrl field in the API.
  ![Postmark portal config](https://github.com/Utkarsh212/CouponAI/blob/main/docs/images/postmark-inbound-webhook-url.png)

7. **Forward a Test Email**
	- From any email account, forward promotional email to the Postmark inbound server email address.
	- Postmark will parse it and send the content to your server’s inbound webhook URL.

8. **See Results**
	-   Open the `index.html` file to view the results.
	-   You'll see a list of all promotional emails along with their details.
	-   Alternatively, you can access the Ngrok URL directly to view all the extracted offers in JOSN.

### Example Results
Sample Input Emails (Screenshots)
Here are example of an email that were forwarded to the inbound server:
![Example Email](https://github.com/Utkarsh212/CouponAI/blob/main/docs/images/example-mail.png)

### Corresponding Output from LLM:
The parsed and structured JSON results:
```json
{
  "company": "Zomato",
  "offer": "Up to 50% off on your favourite treats",
  "details": "Just code ZOMATO while ordering online.",
  "expiry": null,
  "category": "Food"
}
```

## Code Repository
GitHub: [github.com/Utkarsh212/CouponAI](https://github.com/Utkarsh212/CouponAI)

## How I Built It 
The application is powered by a Node.js + Express backend, a locally running LLM model via [Ollama](https://ollama.com/), and **Postmark’s inbound email parsing** feature to automate the extraction of useful promotional data from email content.

### Tech Stack

-   **Backend**: Node.js + Express
-   **LLM**: `gemma3:4b` model running locally via Ollama
-   **Database**: MongoDB
-   **Email Parsing**: Postmark Inbound Stream
-   **Development Tools**: Ngrok (for exposing localhost), dotenv, axios

----------

### Architecture Overview

Below is the architecture diagram that illustrates the complete flow — from the moment a email is forwarded, to how it gets parsed, processed by an LLM, and stored in the database.

![CouponAI Architecture Diagram](https://github.com/Utkarsh212/CouponAI/blob/main/docs/images/couponai-architecture.png)

----------

### Flow & Architecture

1.  **Inbound Email Forwarding**:  
    Users set up forwarding from their personal email accounts to a Postmark-provided inbound email address.
    
2.  **Postmark Webhook Integration**:  
    Postmark parses the email and sends structured email data (subject, text body, HTML body, etc.) to a webhook on my Express server.
    
3.  **Email Parsing & LLM Processing**:  
    The server cleans the raw email content and generates a prompt, which is then sent to a locally running LLM (gemma3:4b). The LLM returns result which is then parsed into a JSON object with the following fields:
   
    -   `company`: Brand or service name
    -   `offer`: Promo description
    -   `details`: Additional details about the offer
    -   `expiry`: Validity date if mentioned
    -   `category`: Context (e.g., food, shopping)
        
4.  **Storage & Retrieval**:  
    The structured offer data is saved in a MongoDB collection and can be retrieved via a public API route.
    
5.  **Frontend (Optional)**:  
    For simplicity, I created a minimal HTML page that displays the available coupons pulled from the backend API.

----------

### Experience with Postmark

This was my first time working with Postmark’s inbound email stream feature — and it was a smooth experience. Setting up the inbound stream, getting the parsing to work, and configuring the webhook was very straightforward. I was especially impressed with how detailed and clean the parsed JSON format is out-of-the-box.
