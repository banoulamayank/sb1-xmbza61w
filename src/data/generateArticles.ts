// Article Generator for all Categories
// This creates 10 comprehensive SEO-optimized articles per category

interface ArticleTemplate {
  titlePattern: string;
  keywords: string[];
  category: string;
}

const articleTemplates: Record<string, ArticleTemplate[]> = {
  'ChatGPT Articles': [
    {
      titlePattern: 'ChatGPT Prompt Engineering Mastery',
      keywords: ['ChatGPT prompts', 'prompt engineering', 'AI prompting'],
      category: 'ChatGPT Articles'
    },
    {
      titlePattern: 'ChatGPT API Integration Complete Guide',
      keywords: ['ChatGPT API', 'OpenAI API', 'API integration'],
      category: 'ChatGPT Articles'
    },
    {
      titlePattern: 'ChatGPT for Business Automation 2025',
      keywords: ['business automation', 'ChatGPT business', 'AI automation'],
      category: 'ChatGPT Articles'
    },
    {
      titlePattern: 'ChatGPT vs Google Bard: Ultimate Comparison',
      keywords: ['ChatGPT vs Bard', 'AI comparison', 'chatbot comparison'],
      category: 'ChatGPT Articles'
    },
    {
      titlePattern: 'ChatGPT for Content Creation: Complete Guide',
      keywords: ['content creation', 'AI writing', 'ChatGPT content'],
      category: 'ChatGPT Articles'
    },
    {
      titlePattern: 'ChatGPT for Coding: Developer\'s Guide 2025',
      keywords: ['ChatGPT coding', 'AI programming', 'code generation'],
      category: 'ChatGPT Articles'
    },
    {
      titlePattern: 'ChatGPT Plus vs Free: Is It Worth It?',
      keywords: ['ChatGPT Plus', 'ChatGPT subscription', 'ChatGPT pricing'],
      category: 'ChatGPT Articles'
    },
    {
      titlePattern: 'ChatGPT for Education: Teaching Guide',
      keywords: ['ChatGPT education', 'AI teaching', 'educational AI'],
      category: 'ChatGPT Articles'
    },
    {
      titlePattern: 'ChatGPT Security and Privacy: Complete Guide',
      keywords: ['ChatGPT security', 'AI privacy', 'ChatGPT safety'],
      category: 'ChatGPT Articles'
    },
    {
      titlePattern: 'ChatGPT Advanced Features and Tricks 2025',
      keywords: ['ChatGPT features', 'ChatGPT tricks', 'ChatGPT tips'],
      category: 'ChatGPT Articles'
    }
  ]
  // ... More categories would be defined here
};

export { articleTemplates };
