// Copyright (c) 2022 Neal Fultz. All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
// 1. Redistributions of source code must retain the above copyright notice,
// this list of conditions and the following disclaimer.
//
// 2. Redistributions in other forms must reproduce the above copyright notice,
// this list of conditions and the following disclaimer in the documentation
// and/or other materials provided with the distribution.
//
// 3. All advertising materials mentioning features or use of this software
// must display the following acknowledgement: This product includes software
// developed by Neal Fultz <neal@njnm.co>.
//
// 4. Neither the name of Neal Fultz nor the names of its contributors may be
// used to endorse or promote products derived from this software without specific
// prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY Neal Fultz "AS IS" AND ANY EXPRESS OR
// IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
// MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO
// EVENT SHALL Neal Fultz BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
// SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
// PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
// BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
// IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.

'use strict';


// Keyboard Shortcut handler
chrome.commands.onCommand.addListener(async function(command) {

  // `tab` will either be a `tabs.Tab` instance or `undefined`.
  let [tab, ...tail] = await chrome.tabs.query({highlighted: true, currentWindow: true });

  if(!tab) return;

  if(command == 'gruppy_close') {

    if(tab.groupId != chrome.tabGroups.TAB_GROUP_ID_NONE) {
      tab = await chrome.tabs.query({ groupId: tab.groupId });
      chrome.tabs.remove(tab.map(t => t.id))
    }

  }

  if(command == 'gruppy_toggle') {

    let tabIds = [tab, ...tail].map(t => t.id);

    if(tab.groupId == chrome.tabGroups.TAB_GROUP_ID_NONE) {
      chrome.tabs.group({tabIds:tabIds})
      return;
    }

    let idx = Math.min(tab.index, ...tail.map(t=>t.index));
    if (idx > 0) {
      let [leftTab] = await chrome.tabs.query({ index:idx-1, currentWindow:true});
      if(leftTab.groupId  == chrome.tabGroups.TAB_GROUP_ID_NONE) {
          //
      } else if (leftTab.groupId != tab.groupId) {
        chrome.tabs.group({tabIds:tabIds, groupId:leftTab.groupId})
        return;
      }
    }
    chrome.tabs.ungroup(tabIds)
  }

});
