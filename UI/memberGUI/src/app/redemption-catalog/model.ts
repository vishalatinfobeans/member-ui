export interface Redemption {
  brandKey: string,
  brandName: string,
  disclaimer: string,
  description: string,
  shortDescription: string,
  terms: string,
  createdDate: string,
  lastUpdateDate: string,
  brandRequirements: requirements,
  imageUrls: {
    '80w-326ppi': string,
    '130w-326ppi': string,
    '200w-326ppi': string,
    '278w-326ppi': string,
    '300w-326ppi': string,
    '1200w-326ppi': string,
  },
  status: string,
  items: Array<item>,
}


interface item {

  utid: string,
  rewardName: string,
  currencyCode: string,
  status: string,
  valueType: string,
  rewardType: string,
  isWholeAmountValueRequired: boolean,
  faceValue: number,
  createdDate: string,
  lastUpdateDate: string,
  countries: Array<string>,
  credentialTypes: Array<string>,
  redemptionInstructions: string

}
interface requirements {
  displayInstructions: string,
  termsAndConditionsInstructions: string,
  disclaimerInstructions: string,
  alwaysShowDisclaimer: boolean
}
