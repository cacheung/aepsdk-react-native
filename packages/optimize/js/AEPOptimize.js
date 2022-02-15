/*
Copyright 2021 Adobe. All rights reserved.
This file is licensed to you under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License. You may obtain a copy
of the License at http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under
the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
OF ANY KIND, either express or implied. See the License for the specific language
governing permissions and limitations under the License.

@flow
@format
*/

'use strict';

import { DeviceEventEmitter, NativeModules } from 'react-native';
const RCTAEPOptimize = NativeModules.AEPOptimize;
import Proposition from './Proposition';
import Offer from './Offer';
import DecisionScope from './DecisionScope';

var onPropositionUpdateSubscription;

module.exports = {
  /**
   * Returns the version of the AEPOptimize extension
   * @param  {string} Promise a promise that resolves with the extension verison
   */
  extensionVersion(): Promise<String> { 
    console.log("extensionVersion API called.");
    return Promise.resolve(RCTAEPOptimize.extensionVersion());
  },
  onPropositionUpdate(onPropositionUpdateCallback: Object) {
    console.log("onPropositionUpdate API called.");
    if(onPropositionUpdateSubscription) {
      onPropositionUpdateSubscription.remove();
    }
    onPropositionUpdateSubscription = DeviceEventEmitter.addListener("onPropositionsUpdate", propositions => {
      const keys = Object.keys(propositions);
      keys.map(key => propositions[key] = new Proposition(propositions[key]));      
      onPropositionUpdateCallback(propositions);
    });
    RCTAEPOptimize.onPropositionsUpdate();        
  }, 
  clearCachedPropositions() {
    console.log("clearCachedPropositions API called.");
    RCTAEPOptimize.clearCachedPropositions();
  },
  getPropositions(decisionScopes: Array<DecisionScope>): Promise<Map<DecisionScope, Proposition>> {
    console.log("getPropositions API called.");
    return new Promise((resolve, reject) => {
      var decisionScopeNames: Array<string> = decisionScopes.map((decisionScope) => decisionScope.getName());
      RCTAEPOptimize.getPropositions(decisionScopeNames).then(propositions => {
        const keys = Object.keys(propositions);
        keys.map(key => propositions[key] = new Proposition(propositions[key]));                
        resolve(propositions);
      }).catch(error => reject(error));
    });
  },
  updatePropositions(decisionScopes: Array<DecisionScope>, xdm: Object, data: Object) {
    console.log("updatePropositions API called.");
    var decisionScopeNames: Array<string> = decisionScopes.map((decisionScope) => decisionScope.getName());
    RCTAEPOptimize.updatePropositions(decisionScopeNames, xdm, data);
  },
  removeOnPropositionUpdateListener() {
    console.log("removeOnPropositionUpdateListener API called.");
    onPropositionUpdateSubscription.remove();
  },
  offerDisplayed(offerId: string, proposition: Proposition) {
    console.log("offerDisplayed API called.");
    const entries = Object.entries(proposition);
    proposition = Object.fromEntries(entries.filter(([key, value]) => typeof(value) !== "function"));
    RCTAEPOptimize.offerDisplayed(offerId, proposition);
  },
  offerTapped(offerId: string, proposition: Proposition) {    
    console.log("offerTapped API called.");
    const entries = Object.entries(proposition);
    proposition = Object.fromEntries(entries.filter(([key, value]) => typeof(value) !== "function"));    
    // console.log(`Offer tapped is ${JSON.stringify(prop)}.`);
    RCTAEPOptimize.offerTapped(offerId, proposition);
  },
  generateDisplayInteractionXdm(offerId: string, proposition: Proposition): Promise<Object> {
    console.log("generateDisplayInteractionXdm API called.");
    return RCTAEPOptimize.generateDisplayInteractionXdm(offerId, proposition);
  },
  generateTapInteractionXdm(offerId: string, proposition: Proposition): Promise<Object> {
    console.log("generateTapInteractionXdm API called.");
    return RCTAEPOptimize.generateTapInteractionXdm(offerId, proposition);
  },
  generateReferenceXdm(proposition: Proposition): Promise<Object> {
    console.log("generateReferenceXdm API called.");
    return RCTAEPOptimize.generateReferenceXdm(proposition);
  }
};