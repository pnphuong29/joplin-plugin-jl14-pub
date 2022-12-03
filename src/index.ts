import joplin from 'api';
import { MenuItemLocation } from 'api/types';

joplin.plugins.register({
    onStart: async function () {
        await joplin.commands.register({
            name: 'deleteUnlinkedResources',
            label: 'Delete unlinked resources',
            execute: async () => {
                const resources = await joplin.data.get(['resources']);

                if (resources.items.length > 0) {
                    resources.items.forEach(async (res) => {
                        const linkedNotes = await joplin.data.get([
                            'resources',
                            res.id,
                            'notes',
                        ]);

                        if (linkedNotes.items.length == 0) {
                            await joplin.data.delete(['resources', res.id]);
                        }
                    });
                }
            },
        });

        await joplin.views.menuItems.create(
            'ToolsDeleteUnlinkedResources',
            'deleteUnlinkedResources',
            MenuItemLocation.Tools
            // { accelerator: 'CmdOrCtrl+Alt+Shift+D' }
        );
    },
});
