import type { EnablerPatterns } from '#p/types/config.js';
import type { IsPluginEnabled, Plugin, ResolveConfig, ResolveEntryPaths } from '#p/types/plugins.js';
import { hasDependency, load } from '#p/util/plugin.js';
import type { LadleConfig } from './types.js';
import { toEntryPattern } from '../../util/protocols.js';
import { resolveConfig as resolveVitestConfig } from '../vitest/index.js';

// https://ladle.dev/docs/config

const title = 'ladle';

const enablers: EnablerPatterns = [/^@ladle\//];

const isEnabled: IsPluginEnabled = ({ dependencies }) => hasDependency(dependencies, enablers);

const config = ['.ladle/config.{mjs,js,ts}'];

const stories: string[] = ['src/**/*.stories.{js,jsx,ts,tsx,mdx}'];
const restEntry: string[] = ['.ladle/components.{js,jsx,ts,tsx}'];
const entry: string[] = [...restEntry, ...stories];

const project = ['.ladle/**/*.{js,jsx,ts,tsx}'];

const resolveEntryPaths: ResolveEntryPaths<LadleConfig> = async localConfig => {
  const localStories = typeof localConfig.stories === 'string' ? [localConfig.stories] : localConfig.stories;
  const patterns = [...restEntry, ...(localStories ?? stories)];

  return patterns.map(toEntryPattern);
};

const resolveConfig: ResolveConfig<LadleConfig> = async (localConfig, options) =>
  localConfig.viteConfig ? resolveVitestConfig(await load(localConfig.viteConfig), options) : [];

export default {
  title,
  enablers,
  isEnabled,
  config,
  entry,
  project,
  resolveEntryPaths,
  resolveConfig,
} satisfies Plugin;
