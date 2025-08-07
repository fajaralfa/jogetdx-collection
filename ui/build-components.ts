import { build } from 'vite';
import tailwindcss from '@tailwindcss/vite'

const components: { entry: string, name: string, fileName: string }[] = [
  {
    entry: 'src/elements/my-element.ts',
    name: 'MyElement',
    fileName: 'my-element',
  },
  {
    entry: 'src/elements/jc-popup.ts',
    name: 'JcPopup',
    fileName: 'jc-popup',
  },
];

async function buildComponent(component) {
  await build({
    build: {
      lib: {
        entry: component.entry,
        name: component.name,
        fileName: component.fileName,
        formats: ['es'],
      },
      outDir: 'dist',
      emptyOutDir: false,
    },
    plugins: [
        tailwindcss(),
    ],
  });
}

async function buildAll() {
  console.log('Building components...');
  
  for (const component of components) {
    console.log(`Building ${component.name}...`);
    await buildComponent(component);
  }
  
  console.log('All components built successfully!');
}

buildAll().catch(console.error); 