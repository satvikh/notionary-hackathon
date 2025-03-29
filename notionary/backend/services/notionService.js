const axios = require('axios');

const NOTION_API = 'https://api.notion.com/v1';

const fetchNotePages = async () => {
  console.log('🔄 Fetching pages from Notion database...');

  const url = `${NOTION_API}/databases/${process.env.NOTION_DATABASE_ID}/query`;

  try {
    const response = await axios.request({
      method: 'post',
      url,
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      },
      data: {} // Notion requires a defined body, even if empty
    });

    console.log(`✅ Fetched ${response.data.results.length} pages.`);
    return response.data.results;
  } catch (err) {
    console.error('❌ Notion API request failed:', err.response?.status);
    console.error(JSON.stringify(err.response?.data, null, 2));
    throw err;
  }
};

const fetchPageContent = async (pageId) => {
  const url = `${NOTION_API}/blocks/${pageId}/children?page_size=100`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
      }
    });

    const blocks = response.data.results;

    const content = blocks
      .filter(block =>
        ['paragraph', 'heading_1', 'heading_2', 'bulleted_list_item', 'numbered_list_item'].includes(block.type)
      )
      .map(block => {
        const text = block[block.type]?.rich_text || [];
        return text.map(t => t.plain_text).join('');
      })
      .join('\n');

    return content;
  } catch (err) {
    console.error(`❌ Failed to fetch content for page ${pageId}`);
    console.error(JSON.stringify(err.response?.data, null, 2));
    return '';
  }
};

const fetchFullNotes = async () => {
  const pages = await fetchNotePages();

  const notes = await Promise.all(
    pages.map(async (page) => {
      const title = page.properties['Name']?.title?.[0]?.plain_text || 'Untitled';
      const tags = page.properties['Tags']?.multi_select?.map(tag => tag.name) || [];
      const content = await fetchPageContent(page.id);

      return {
        topic: title,
        tags,
        content
      };
    })
  );

  return notes;
};

module.exports = {
  fetchFullNotes
};
