import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { HF_TOKEN } from '$env/static/private';

export const POST: RequestHandler = async ({ request }) => {
	const { prompt } = await request.json();

	if (!HF_TOKEN) {
		return json({ error: 'HF_TOKEN not set in environment' }, { status: 500 });
	}

	try {
		const response = await fetch('https://router.huggingface.co/v1/chat/completions', {
			method: 'POST',
			headers: {
				Authorization: `Bearer ${HF_TOKEN}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				model: 'Qwen/Qwen2.5-72B-Instruct',
				messages: [
					{
						role: 'system',
						content:
							'You are a content generator for a website. Keep responses to 2-3 short paragraphs. Plain text only, no markdown.'
					},
					{
						role: 'user',
						content: prompt
					}
				],
				max_tokens: 200,
				temperature: 0.8
			})
		});

		const data = await response.json();
		const text = data?.choices?.[0]?.message?.content?.trim() || '...';
		return json({ result: text });
	} catch (err) {
		console.error(err);
		return json({ error: 'Generation failed' }, { status: 500 });
	}
};
