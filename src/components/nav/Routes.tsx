import React, { FC, lazy, Suspense } from 'react';
import { Route, Routes as RouterRoutes } from 'react-router-dom';
import { Spinner } from '../interface/Spinner';

const lazyNamed = <K extends string>(
  loader: () => Promise<Record<K, React.ComponentType<any>>>,
  key: K,
) => lazy(() => loader().then((m) => ({ default: m[key] })));

const Home = lazyNamed(() => import('../../containers/Home'), 'Home');
const About = lazyNamed(() => import('../../containers/About'), 'About');
const Apis = lazyNamed(() => import('../../containers/Apis'), 'Apis');
const Contact = lazyNamed(() => import('../../containers/Contact'), 'Contact');
const Interface = lazyNamed(() => import('../../containers/Interface'), 'Interface');
const Links = lazyNamed(() => import('../../containers/Links'), 'Links');
const Toys = lazyNamed(() => import('../../containers/Toys'), 'Toys');

const Recipes = lazyNamed(() => import('../../containers/apis/Recipes'), 'Recipes');
const Stocks = lazyNamed(() => import('../../containers/apis/Stocks'), 'Stocks');
const Dashboard = lazyNamed(() => import('../../containers/interface/Dashboard'), 'Dashboard');
const Bombsquad = lazyNamed(() => import('../../containers/toys/Bombsquad'), 'Bombsquad');
const Boxes = lazyNamed(() => import('../../containers/toys/Boxes'), 'Boxes');
const Divide = lazyNamed(() => import('../../containers/toys/Divide'), 'Divide');
const Icosahedron = lazyNamed(() => import('../../containers/toys/Icosahedron'), 'Icosahedron');
const WaveFunctionCollapse = lazyNamed(
  () => import('../../containers/toys/WaveFunctionCollapse'),
  'WaveFunctionCollapse',
);

export const Routes: FC = () => {
  return (
    <Suspense fallback={<Spinner text="loading…" />}>
      <RouterRoutes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/apis" element={<Apis />} />
        <Route path="/apis/stocks" element={<Stocks />} />
        <Route path="/apis/recipes" element={<Recipes />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/interface" element={<Interface />} />
        <Route path="/interface/dashboard" element={<Dashboard />} />
        <Route path="/links" element={<Links />} />
        <Route path="/toys" element={<Toys />} />
        <Route path="/toys/bombsquad" element={<Bombsquad />} />
        <Route path="/toys/icosahedron" element={<Icosahedron />} />
        <Route path="/toys/divide" element={<Divide />} />
        <Route path="/toys/boxes" element={<Boxes />} />
        <Route path="/toys/wfc" element={<WaveFunctionCollapse />} />
      </RouterRoutes>
    </Suspense>
  );
};
