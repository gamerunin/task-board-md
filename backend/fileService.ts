import fs from 'fs/promises';
import matter from 'gray-matter';

import path from 'path';

const file = path.resolve(__dirname, '..', 'task_board.md');

export async function readBoard() {
  const content = await fs.readFile(file, 'utf8');
  const sections = content.split(/^## /m).slice(1);
  const tasks: any[] = [];
  for (const section of sections) {
    const [titleLine, ...rest] = section.split('\n');
    const status = titleLine.trim();
    const blocks = rest.join('\n').split(/^### /m).slice(1);
    for (const blk of blocks) {
      const [header, ...bodyLines] = blk.split('\n');
      const id = header.trim().split(' ')[0];
      const md = bodyLines.join('\n');
      const data = matter('---\n' + md.replace(/^- /mg, '') + '\n---');
      tasks.push({ id, status, ...data.data });
    }
  }
  return tasks;
}
