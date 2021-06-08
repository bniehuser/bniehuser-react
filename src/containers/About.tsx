import React, { FC } from 'react';
import { Link } from 'react-router-dom';

export const About: FC = () => {
  return <div>
    <h2>About Barry</h2>
    <p>Hi! I'm Barry.  I'm a longtime fullstack developer with a focus on back end systems and system intercommunication.  I've done a lot of API integrations, custom software systems, data storage and data stream manipulation, process communication, and a whole ton of other odds and ends along the way.</p>

    <p>Here's <a href={'/data/resume_bniehuser.pdf'} download>my resume</a> in case you're interested.</p>

    <p>When I started web development back in 1998/1999, I started with Perl.  Or more accurately with a long-dead scripting language that looked kind of like if you wrote PHP 1.0 in BASIC.
      But <em>it</em> was written in Perl, and from there I learned to write my own cgi scripts in Perl and build websites and web applications that way.
      I learned to take output from dBase files and translate them into web content.  As a database administrator, it both hurt to take a step backwards from a normalized database and was amazing to see data integrated into what I had previously considered a purely decorative interface.
    </p>
    <p>It was gruelling back then.  Whole pages built with 'print' outputs from scripts.  No IDEs, no code repositories, and code usually edited using Joe's Own Editor directly in the live server terminal window.  Walking uphill both ways in the snow.</p>
    <p>
      We've come a long, long way since then.  I went from procedural Perl script outputs to writing my own object-oriented Perl modules and libraries for generating templated websites.  Built product management systems and rudimentary CMSs, building and administering complex MySQL databases to store and track the data.
      I moved from Perl into an array of other scripting languages, including ASP, PHP, Python, Node, and others.  These days most of my server side work is PHP using Symfony framework and PostgreSQL back end, although I've done a bit of toying with Python using Django for a few sites and Flask for a couple APIs (including the one behind this site).
      I write and manage applications, datastores, and their associated server components, so I've done quite a bit of daemon programming and deployment management as well.  I'm a fan of robust logging infrastructure and frequent performance testing and code profiling.  There's always a way to tune your systems a little smarter, a little tighter.
    </p>
    <p>
      At some point my love of databases and normalized data branched off into a variety of other data storage and data communication arenas.  I became really interested in data pipelines, cache systems, event-driven communications, email and messaging system automation, API integrations, and other aspects of deeper systems engineering.
      I've written my share of socket servers, message brokers, and data transformers.  I've integrated systems with various payment processors, product databases, scheduling systems, and accounting platforms.  I've learned virtual environments, from local environment Docker stacks to AWS CloudFormation deployments.  I've dealt with raw packet communications from hardware devices both over TCP and UDP, as well as raw Bluetooth communication.
      I really enjoy seeing disparate systems working together, and blending different approaches to optimize data access and transfer.
    </p>

    <p>On the front end, I've never been much of a designer (obviously), but I've always enjoyed working on user interfaces, since the days of slicing photoshop files into table based layouts on up to dynamic data administration portals.  I enjoy using all the technology the browser has to offer to craft websites
      that are slick, functional, and performant.  I've kept up with all the standards and display frameworks, using Bootstrap, Material Design, Kendo UI, and Ant Designs.  I remember thinking CSS was a fad, and now I can't imagine building a website that didn't use a SASS preprocessor.
    </p>

    <p>I've had a long time love for Javascript.  I've been toying with Dynamic HTML since back when it was like magic, long before the rise of jQuery.  I built several of my own libraries to ease DOM manipulation and implement rudimentary animation and interactivity in sites.
    I grew to appreciate the cobbled-together infrastructure of modern web development, both in application development (build pipelines, multiple languages, minifying and packaging, etc) and in the browser itself (html, svg, xml, javascript, dom manipulation, event listening, http requests, long-polling, websockets, now web workers and web assembly).
      It's an industry that's continually kept me on my toes and kept me learning and experimenting with the latest technologies, best practices, and developer mindsets.
    </p>
    <p>Now most of the Javascript I deal with is actually Typescript, and while I'll still write one-off tools using Node for server-side Javascript, I've got a pretty strong focus on modern frameworks.
      I spent some time learning AngularJS (back when it was just 'angular') and then dove into the deep end with Angular 2.0 (which is now just 'angular', and is version 12 or 13 or something).
      I used my knowledge of Typescript and Angular to learn NativeScript, which is a compiled solution to use javascript code to create native mobile applications; generating the appropriate Java and Objective-C code to turn a basic website-like app into a native application.
      Eventually I decided to try my hand at React, and have since spent most of my effort there, including React Native for mobile app generation, which works much the same as NativeScript.
      I like React's methodology, and the library keeps improving both in developer friendliness and performance.  In fact, this site is a React-based site.
    </p>
    <p>I built this little site because I've had the domain forever and wanted somewhere to collect some old and new tools I've built.  I've made so many little things over time I can't even find the vast majority of them anymore, so it'd be nice if I started archiving them somewhere.</p>
    <p>It's not even all that mobile-friendly, which is like a death curse for modern sites, but a lot of my old stuff is definitely desktop-oriented, so I wasn't too worried about the mobile experience.  Hey, at least the menu shifts, and most of the content is pretty size-agnostic in the first place.</p>
    <p>Anyway, before I ramble further, feel free to check out the site (such as it is), and if you want to get in touch with me, feel free to <Link to={'/contact'}>leave me a note</Link>.  Thanks for visiting!</p>
  </div>;
}
