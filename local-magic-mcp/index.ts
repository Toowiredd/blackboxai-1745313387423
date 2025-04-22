#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';

const COMPONENTS = [
  {
    name: 'ActivitySelector',
    keywords: ['activity', 'choose activity', 'select activity', 'activity type'],
    description: 'Component to choose an activity from predefined options.',
    usage: '<ActivitySelector />',
  },
  {
    name: 'SkillLevelSelector',
    keywords: ['skill', 'skill level', 'select skill', 'level of skill'],
    description: 'Component to select skill level: Beginner, Intermediate, Advanced.',
    usage: '<SkillLevelSelector />',
  },
  {
    name: 'LocationInput',
    keywords: ['location', 'input location', 'where', 'place'],
    description: 'Component to input location information.',
    usage: '<LocationInput />',
  },
  {
    name: 'DurationSelector',
    keywords: ['duration', 'time', 'length', 'select duration'],
    description: 'Component to select duration of the activity.',
    usage: '<DurationSelector />',
  },
  {
    name: 'GroupSizeInput',
    keywords: ['group size', 'number of people', 'participants', 'group'],
    description: 'Component to input the size of the group.',
    usage: '<GroupSizeInput />',
  },
  {
    name: 'ReviewAndGenerate',
    keywords: ['review', 'summary', 'generate', 'final step'],
    description: 'Component to review selections and generate the guide.',
    usage: '<ReviewAndGenerate />',
  },
];

class LocalMagicMcpServer {
  server: Server;

  constructor() {
    this.server = new Server(
      {
        name: 'github.com/21st-dev/magic-mcp',
        version: '0.1.0',
      },
      {
        capabilities: {
          resources: {},
          tools: {},
        },
      }
    );

    this.setupToolHandlers();

    this.server.onerror = (error) => {
      console.error('[MCP Error]', error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  setupToolHandlers() {
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        {
          name: 'find_component',
          description: 'Find existing UI component matching a natural language description',
          inputSchema: {
            type: 'object',
            properties: {
              description: {
                type: 'string',
                description: 'Natural language description of the desired UI component',
              },
            },
            required: ['description'],
          },
        },
      ],
    }));

    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      if (request.params.name !== 'find_component') {
        throw new Error(`Unknown tool: ${request.params.name}`);
      }

      if (!request.params.arguments || typeof request.params.arguments.description !== 'string') {
        throw new Error('Invalid or missing description argument');
      }
      const desc = request.params.arguments.description.toLowerCase();

      // Find best matching component by keyword
      for (const comp of COMPONENTS) {
        for (const keyword of comp.keywords) {
          if (desc.includes(keyword)) {
            return {
              content: [
                {
                  type: 'text',
                  text: JSON.stringify({
                    name: comp.name,
                    description: comp.description,
                    usage: comp.usage,
                  }, null, 2),
                },
              ],
            };
          }
        }
      }

      return {
        content: [
          {
            type: 'text',
            text: 'No matching component found for the given description.',
          },
        ],
      };
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error('Local Magic MCP server running on stdio');
  }
}

const server = new LocalMagicMcpServer();
server.run().catch(console.error);
