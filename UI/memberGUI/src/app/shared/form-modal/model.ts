export interface formFields {
  label: string,
  fieldType: string,
  fieldName: string,
  validation: { required: boolean },

}

export interface physicalRedemption {
  firstName: string,
  lasetName: string,
  email: string,
  address1: string,
  adress2: string,
  city: string,
  state: string,
  zip: string,
  phone: string
}
