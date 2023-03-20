import {ConfigInterface, MessageInterface} from '@type/chat';
import {API_KEY} from "@constants/chat";

export const getPicture = async (
    endpoint: string,
    prompt: string,
    config: ConfigInterface,
    apiKey?: string
) => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            "key": API_KEY || "",
            prompt,
            "negative_prompt": "",
            "seed": null,
            "safety_checker": "yes",
            "webhook": null,
            "track_id": null,
            "width": config.width + '',
            "height": config.height + '',
            "samples": "1",
            "num_inference_steps": config.num_inference_steps + '',
        }),
    });
    if (!response.ok) throw new Error(await response.text());

    return await response.json();
};

export const getChatCompletion = async (
    endpoint: string,
    messages: MessageInterface[],
    config: ConfigInterface,
    apiKey?: string
) => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages,
            ...config,
        }),
    });
    if (!response.ok) throw new Error(await response.text());

    return await response.json();
};

export const getChatCompletionStream = async (
    endpoint: string,
    messages: MessageInterface[],
    config: ConfigInterface,
    apiKey?: string
) => {
    const headers: HeadersInit = {
        'Content-Type': 'application/json',
    };
    if (apiKey) headers.Authorization = `Bearer ${apiKey}`;

    const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages,
            ...config,
            stream: true,
        }),
    });
    if (response.status === 404 || response.status === 405)
        throw new Error(
            'Message from freechatgpt.chat:\nInvalid API endpoint! We recommend you to check your free API endpoint.'
        );

    if (response.status === 429 || !response.ok) {
        const text = await response.text();
        let error = text;
        if (text.includes('insufficient_quota')) {
            error +=
                '\nMessage from freechatgpt.chat:\nToo many request! We recommend changing your API endpoint or API key';
        }
        throw new Error(error);
    }

    return response.body;
};
