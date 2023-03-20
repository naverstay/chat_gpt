import {ChatInterface, ConfigInterface} from '@type/chat';

export const API_KEY = import.meta.env.VITE_API_KEY;
export const API_LIMIT = Infinity; // parseInt(import.meta.env.VITE_API_LIMIT || '5');

// default system message obtained using the following method: https://twitter.com/DeminDimin/status/1619935545144279040

export const defaultChatConfig: ConfigInterface = {
    temperature: 1,
    presence_penalty: 0,
    top_p: 1,
    frequency_penalty: 0,
    width: 512,
    height: 512,
    num_inference_steps: 20,
    guidance_scale: 7.5
};

export const generateDefaultChat = (title: string, text?: string): ChatInterface => ({
    title: title,
    messages: [{role: 'system', content: text || ''}],
    config: {...defaultChatConfig},
    titleSet: false,
});

export const codeLanguageSubset = [
    'python',
    'javascript',
    'java',
    'go',
    'bash',
    'c',
    'cpp',
    'csharp',
    'css',
    'diff',
    'graphql',
    'json',
    'kotlin',
    'less',
    'lua',
    'makefile',
    'markdown',
    'objectivec',
    'perl',
    'php',
    'php-template',
    'plaintext',
    'python-repl',
    'r',
    'ruby',
    'rust',
    'scss',
    'shell',
    'sql',
    'swift',
    'typescript',
    'vbnet',
    'wasm',
    'xml',
    'yaml',
];
