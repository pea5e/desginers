import React from 'react'
import Income from './totalincome';
import Analytics from './analytics'
import Yourbest from './mybests'

export default function Stats() {
  return( 
    <>
      <div id="collection-title">Dashboard</div>
      <div id="stats">
          <Income/>
          <Analytics/>
      </div>
      <Yourbest/>
    </>
  );
}