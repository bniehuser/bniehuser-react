import React, { FC } from 'react';

export const Links: FC = () => {
  return <div>
    <h2>Links</h2>
    <p>So, I <em>don't use social media</em>.  If you find me on facebook or instagram or whatever, rest assured I haven't touched those sites in probably years.  Instead, here are some relevant links about me, and some sites I reference frequently in pursuit of hobbyist web game development.</p>
    <h4>Barry's Stuff</h4>
    <ul>
      <li><a href={'https://linkedin.com/bniehuser'} target={'_blank'}>LinkedIn</a></li>
      <li><a href={'https://github.com/bniehuser'} target={'_blank'}>GitHub</a></li>
      <li><a href={'/data/resume_bniehuser.pdf'} target={'_blank'}>My Resume</a></li>
    </ul>
    <h4>Other Stuff</h4>
  </div>;
}
