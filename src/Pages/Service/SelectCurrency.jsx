import React from 'react'
// chenges
const SelectCurrency = ({currency,handleChange,handleBlur,name}) => {
  return (
    <>
    <select class="form-select" id="currency" name="currency" onChange={handleChange} onBlur={handleBlur}>
    <option>select currency</option>
    <option value="USD">US Dollar</option>
    <option value="GBP">United Kingdom</option>
    <option value="VUV">Vanuatu Vatu</option>
    <option value="VEF">Venezuelan BolÃ­var</option>
    <option value="VND">Vietnamese Dong</option>
    <option value="YER">Yemeni Rial</option>
    <option value="ZMK">Zambian Kwacha</option>
</select>
    </>
  )
}

export default SelectCurrency