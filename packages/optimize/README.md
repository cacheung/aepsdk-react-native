
# React Native AEP Optimize Extension


`@adobe/react-native-aepoptimize` is a wrapper around the iOS and Android [Adobe Experience Platform Optimize Extension](https://aep-sdks.gitbook.io/docs/) to allow for integration with React Native applications.

## Peer Dependencies

The Adobe Experience Platform Optimize extension has the following peer dependency, which must be installed prior to installing the optimize extension:
- [Core](../core/README.md)
- [Edge](../edge/README.md)

## Installation

See [Requirements and Installation](https://github.com/adobe/aepsdk-react-native#requirements) instructions on the main page 

Download the `@adobe/react-native-aepoptimize` node package from the [One Drive url](https://adobe-my.sharepoint.com/:u:/p/shtomar/EfdVTaUkBnFNnwbfBVISCuIBbA9WU4SfXNFzT05UH8iSog?e=24eG1j) and save it to a folder.
Install the `@adobe/react-native-aepoptimize` package:

```bash
cd MyReactApp
npm install {path to the node package}
```

Optimize native packages are not yet released and their github repo is private. Additional setup needs to be done in Podfile and build.gradle for integrating RN Optimize package in your RN application.

**Podfile Setup**
The RN Optimize package depends on the AEPOptimize v1.0.0, which is not yet released and their github repo is private. Download the AEPOptimize source code from the [One Drive URL](https://adobe-my.sharepoint.com/:u:/p/shtomar/EXzEX5v9fWBOjYYoWvy9H58BcA8fsGwF0hpdP8pBlfIePA?e=CEreTJ) and unzip in a folder.

Add the following pod dependency in your iOS project Podfile under the application target.

```Ruby
target 'MyReactApp' do  
pod 'AEPOptimize', :path => '{path to the folder where AEPOptimize code was unzipped}'
end
```

**Gradle setup**
In the Android project of RN application add the following under allProjects -> repositories

```groovy
flatDir {
dirs project(':adobe_react-native-aepmessaging').file('libs')
}
```

## Usage

### Initializing and registering the extension

Initialization of the SDK should be done in native code, documentation on how to initialize the SDK can be found [here](https://github.com/adobe/aepsdk-react-native#initializing).

Example:  

iOS  
```objectivec
@import AEPCore;
@import AEPLifecycle;
@import AEPEdge;
@import AEPOptimize;

@implementation AppDelegate
-(BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions {
  [AEPMobileCore setLogLevel: AEPLogLevelTrace];
  [AEPMobileCore registerExtensions: @[AEPMobileEdge.class, AEPMobileOptimize.class] completion:^{
    [AEPMobileCore configureWithAppId:@"yourAppID"];
    [AEPMobileCore lifecycleStart:@{@"contextDataKey": @"contextDataVal"}];
  }
  ];
  return YES;
}
@end
```

Android  
```java
import com.adobe.marketing.mobile.AdobeCallback;
import com.adobe.marketing.mobile.InvalidInitException;
import com.adobe.marketing.mobile.Lifecycle;
import com.adobe.marketing.mobile.LoggingMode;
import com.adobe.marketing.mobile.MobileCore;
import com.adobe.marketing.mobile.Edge;
import com.adobe.marketing.mobile.optimize.Optimize;
  
...
import android.app.Application;
...
public class MainApplication extends Application implements ReactApplication {
  ...
  @Override
  public void on Create(){
    super.onCreate();
    ...
    MobileCore.setApplication(this);
    MobileCore.setLogLevel(LoggingMode.DEBUG);
    try {
      Edge.registerExtension();
      Optimize.registerExtension();
      MobileCore.configureWithAppID("yourAppID");
      MobileCore.start(new AdobeCallback() {
        @Override
        public void call(Object o) {
          MobileCore.lifecycleStart(null);
        }
      });
    } catch (InvalidInitException e) {
      ...
    }
  }
}     
```

### Importing the extension:

```javascript
import { AEPOptimize, Offer, Proposition, DecisionScope } from '@adobe/react-native-aepoptimize';
```

## API reference

### Clearing the cached Propositions:

**Syntax**
```javascript
clearCachedPropositions()
```

**Example**
```javascript
AEPOptimize.clearCachedPropositions();
```

### Getting the SDK version:

**Syntax**
```javascript
extensionVersion(): Promise<string>
```

**Example**
```javascript
AEPOptimize.extensionVersion().then(newVersion => console.log("AdobeExperienceSDK: AEPOptimize version: " + newVersion);
```

### getting the cached propositions:
This API returns the cached propositions for the provided DecisionScopes from the in-memory Proposition cache.

**Syntax**
```javascript
getPropositions(decisionScopes: Array<DecisionScope>): Promise<Map<string, Proposition>>
```

**Example**
```javascript
const decisionScopeText = new DecisionScope("{DecisionScope name}");
const decisionScopeImage = new DecisionScope("{DecisionScope name}");
const decisionScopeHtml = new DecisionScope("{DecisionScope name{");
const decisionScopeJson = new DecisionScope("{DecisionScope name}");
const decisionScopes = [ decisionScopeText, decisionScopeImage, decisionScopeHtml, decisionScopeJson ];

AEPOptimize.getPropositions(decisionScopes).then(
   (propositions: Map<string, typeof Proposition>) => {
      //Your app logic using the propositions
});
```

### Adding onPropositionUpdate callback:
Callback that will be called with the updated Propositions.

**Syntax**
```javascript
onPropositionUpdate(adobeCallback: AdobeCallback)
```

**Example**
```javascript
AEPOptimize.onPropositionUpdate({
  call(proposition: Map<String, typeof Proposition>) {
    //App logic using the updated proposition
  }
});        
```

### updating the propositions:
This API fetches the propositions for the provided DecisionScope list.

**Syntax**
```javascript
updatePropositions(decisionScopes: Array<DecisionScope>, xdm: ?Map<string, any>, data: ?Map<string, any>)
```

**Example**
```javascript
const decisionScopeText = new DecisionScope("{DecisionScope name}");
const decisionScopeImage = new DecisionScope("{DecisionScope name}");
const decisionScopeHtml = new DecisionScope("{DecisionScope name{");
const decisionScopeJson = new DecisionScope("{DecisionScope name}");
const decisionScopes = [ decisionScopeText, decisionScopeImage, decisionScopeHtml, decisionScopeJson ];

AEPOptimize.updatePropositions(decisionScopes, null, null);
```

---

## Public classes

- [DecisionScope](#decisionscope)
- [Proposition](#proposition)
- [Offer](#offer)

### DecisionScope
This class represents the decision scope which is used to fetch the decision propositions from the Edge decisioning services. The encapsulated scope name can also represent the Base64 encoded JSON string created using the provided activityId, placementId and itemCount.

```javascript
/**
* class represents a decision scope used to fetch personalized offers from the Experience Edge network.
*/
module.exports = class DecisionScope {
    name: string;        

    constructor(name: ?string, activityId: ?string, placementId: ?string, itemCount: ?number) {                
        if(name && name.trim()) {
            this.name = name;
        } else {            
            const decisionScopeObject = {};
            decisionScopeObject['activityId'] = activityId;            
            decisionScopeObject['placementId'] = placementId;    
            decisionScopeObject['itemCount'] = itemCount;   
            this.name = Buffer.from(JSON.stringify(decisionScopeObject)).toString("base64");            
        }                
    }

    /**
    * Gets the name of this scope
    * @return {string} - The name of the scope
    */
    getName(): string {
       return this.name; 
    }
};
```

### Proposition
This class represents the decision propositions received from the decisioning services, upon a personalization query request to the Experience Edge network.

```javascript
module.exports = class Proposition {
    id: string;
    items: Array<Offer>;
    scope: string;
    scopeDetails: Map<string, any>;

    constructor(eventData: any) {
        this.id = eventData['id'];
        this.scope = eventData['scope'];
        this.scopeDetails = eventData['scopeDetails'];
        if(eventData['items']) {
            this.items = eventData['items'].map(offer => new Offer(offer));                
        }                
    }    
        
    /**
    * Generates a map containing XDM formatted data for {Experience Event - Proposition Reference} field group from proposition arguement.
    * The returned XDM data does not contain eventType for the Experience Event.     
    * @return {Promise<Map<string, any>>} a promise that resolves to xdm data map
    */
    generateReferenceXdm(): Promise<Map<string, any>> {
        const entries = Object.entries(this).filter(([key, value]) => typeof(value) !== "function");
        const proposition = Object.fromEntries(entries);    
        return Promise.resolve(RCTAEPOptimize.generateReferenceXdm(proposition));
    };
}
```

### Offer
This class represents the proposition option received from the decisioning services, upon a personalization query to the Experience Edge network.

```javascript
module.exports = class Offer {
    id: string;
    etag: string;
    schema: string;
    data: {string: any};    

    get content(): ?string {
        return this.data["content"];
    }

    get format(): ?string {
        return this.data["format"];
    }

    get language(): ?Array<string> {
        return this.data["language"];
    }

    get characteristics(): ?Map<string, any> {
        return this.data["characteristics"];
    }    

    constructor(eventData: any) {
        this.id = eventData['id'];
        this.etag = eventData['etag'];
        this.schema = eventData['schema'];        
        this.data = eventData['data'];
    }

    /**
    * Dispatches an event for the Edge network extension to send an Experience Event to the Edge network with the display interaction data for the
    * given Proposition offer.
    * @param {Proposition} proposition - the proposition this Offer belongs to
    */
    displayed(proposition: Proposition): void {
        const entries = Object.entries(proposition).filter(([key, value]) => typeof(value) !== "function");        
        const cleanedProposition = Object.fromEntries(entries);        
        RCTAEPOptimize.offerDisplayed(this.id, cleanedProposition);
    };

    /**
    * Dispatches an event for the Edge network extension to send an Experience Event to the Edge network with the tap interaction data for the
    * given Proposition offer.
    * @param {Proposition} proposition - the proposition this Offer belongs to
    */
    tapped(proposition: Proposition): void {                
        console.log("Offer is tapped");
        const entries = Object.entries(proposition).filter(([key, value]) => typeof(value) !== "function");
        const cleanedProposition = Object.fromEntries(entries);        
        RCTAEPOptimize.offerTapped(this.id, cleanedProposition);
    };

    /**
    * Generates a map containing XDM formatted data for {Experience Event - Proposition Interactions} field group from proposition arguement.
    * The returned XDM data does contain the eventType for the Experience Event with value decisioning.propositionDisplay.    
    * Note: The Edge sendEvent API can be used to dispatch this data in an Experience Event along with any additional XDM, free-form data, and override
    * dataset identifier.
    * @param {Proposition} proposition - the proposition this Offer belongs to
    * @return {Promise<Map<string, any>>} - a promise that resolves to xdm map
    */
    generateDisplayInteractionXdm(proposition: Proposition): Promise<Map<string, any>> {        
        const entries = Object.entries(proposition).filter(([key, value]) => typeof(value) !== "function");
        const cleanedProposition = Object.fromEntries(entries);
        return Promise.resolve(RCTAEPOptimize.generateDisplayInteractionXdm(this.id, cleanedProposition));        
    };   

    /**
    * Generates a map containing XDM formatted data for {Experience Event - Proposition Interactions} field group from this proposition arguement.    
    * The returned XDM data contains the eventType for the Experience Event with value decisioning.propositionInteract.    
    * Note: The Edge sendEvent API can be used to dispatch this data in an Experience Event along with any additional XDM, free-form data, and override
    * dataset identifier.    
    * @param {Proposition} proposition - proposition this Offer belongs to
    * @return {Promise<Map<string, any>>} a promise that resolves to xdm map
    */
    generateTapInteractionXdm(proposition: Proposition): Promise<Map<string, any>> {
        const entries = Object.entries(proposition).filter(([key, value]) => typeof(value) !== "function");
        const cleanedProposition = Object.fromEntries(entries);
        return Promise.resolve(RCTAEPOptimize.generateTapInteractionXdm(this.id, cleanedProposition));
    };   
};
```

