import React from 'react';
import { addons, types } from 'storybook/manager-api';
import { DslPanel } from './addons/dsl-panel/DslPanel';

const ADDON_ID = 'dsl-panel';
const PANEL_ID = `${ADDON_ID}/panel`;

addons.register(ADDON_ID, () => {
  addons.add(PANEL_ID, {
    type: types.PANEL,
    title: 'DSL',
    paramKey: 'dsl',
    render: ({ active }) => (active ? <DslPanel /> : null),
  });
});
