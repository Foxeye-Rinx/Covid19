import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import { DateTime } from 'luxon';
import covidStats from './covid-stats';

const formatDate = date => {
  if (!date) {
    return ''
  }
  const isoDate = new Date(date).toISOString()
  return DateTime.fromISO(isoDate).toFormat('MM-dd-yyyy');
}

// eslint-disable-next-line no-unused-vars
const labelLookup = {
  confirmed: 'Confirmed Covid Cases',
  recovered: 'Recovered Patients',
  deaths: 'Patients Deaths',
  updated: 'Information Updated',
  population: 'Population',
  sq_km_area: 'Area (sq km)',
  life_expectancy: 'Life Expectancy',
  elevation_in_meters:	'Elevation in Meters',
  continent:	'Continent',
  abbreviation:	'Abbreviation',
  location:	'Location',
  iso: 'ISO',
  capital_city:	'Capital City',
  lat:	'Lat',
  long:	'Long'
};

function getCountries(covidStats) {
  const countries = [];
  for (let country in covidStats) {
    countries.push(country);
  }
  return countries;
}
const countries = getCountries(covidStats);

function getRegions(country) {
  const data = covidStats[country];
  const regions = [];
  for (let region in data) {
    regions.push(region);
  }
  return regions;
}

function renderRegion(regionName) {
  return regionName === 'All' ? 'All Regions' : regionName;
}

function renderRecovered(recovered) {
  if (recovered === 0) {
    return '0'
  }
  return recovered ? recovered : ''
}
/** Check if the country has only 'All' value for region data */
function hasOnlyAll(regions) {
  return regions.length === 1 && regions[0] === 'All';
}

function shouldRenderRegion(country) {
  if (!country) {
    return false;
  }
  const regions = getRegions(country);
  return !hasOnlyAll(regions);
}

function getRegionData(covidStats, country, region) {
  if (!country) {
    return null
  } else {
    if (region) {
      return covidStats[country][region]
    } else {
      return covidStats[country]['All']
    }
  }
}

export default function AddressForm() {
  const [country, setCountry] = useState('');
  const [region, setRegion] = useState('');

  const handleChangeCountry = (event) => {
    setCountry(event.target.value);
    setRegion('');
  };
  const handleChangeRegion = (event) => {
    setRegion(event.target.value);
  };
  const regionData = getRegionData(covidStats, country, region);
  return (
    <React.Fragment>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth>
            <InputLabel id="select-country">Select Country</InputLabel>
            <Select
              labelId="select-country-label"
              id="select-country"
              value={country}
              onChange={handleChangeCountry}>
              {countries.map((name) => (
                <MenuItem key={name} value={name}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          {shouldRenderRegion(country) && (
            <FormControl fullWidth>
              <InputLabel id="select-region">Select Region</InputLabel>
              <Select
                labelId="select-region-label"
                id="select-region"
                value={region}
                onChange={handleChangeRegion}>
                {getRegions(country).map((name) => (
                  <MenuItem key={name} value={name}>
                    {renderRegion(name)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          {country && (
            <Typography component="h1" variant="h4">
              Country: {country}
            </Typography>
          )}
          {shouldRenderRegion(country) && region && (
            <Typography component="h2" variant="h5">
              Region: {renderRegion(region)}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label={labelLookup['confirmed']}
            value={regionData?.confirmed || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label={labelLookup['recovered']}
            value={renderRecovered(regionData?.recovered)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label={labelLookup['deaths']}
            value={regionData?.deaths || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label={labelLookup['updated']}
            value={formatDate(regionData?.updated)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label={labelLookup['population']}
            value={regionData?.population || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label={labelLookup['life_expectancy']}
            value={regionData?.life_expectancy || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label={labelLookup['elevation_in_meters']}
            value={regionData?.elevation_in_meters || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label={labelLookup['elevation_in_meters']}
            value={regionData?.elevation_in_meters || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label={labelLookup['continent']}
            value={regionData?.continent || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label={labelLookup['abbreviation']}
            value={regionData?.abbreviation || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label={labelLookup['location']}
            value={regionData?.location || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label={labelLookup['iso']}
            value={regionData?.iso || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label={labelLookup['capital_city']}
            value={regionData?.capital_city || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label={labelLookup['lat']}
            value={regionData?.lat || ''}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            disabled
            fullWidth
            label={labelLookup['long']}
            value={regionData?.long || ''}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
