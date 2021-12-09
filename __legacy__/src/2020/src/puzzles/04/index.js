import React from 'react';
import { test, real } from './input';

const isTest = false;

const calc1 = (input) => {
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  const isValid = (passport) =>
    requiredFields.every((key) => passport[key] !== undefined);

  return input.filter(isValid).length;
};

const calc2 = (input) => {
  const range = (min, max) => (value) => {
    const numeric = Number.parseInt(value);

    console.log(min, max, numeric);

    return numeric >= min && numeric <= max;
  };

  const pattern = (pattern) => (value) => {
    return pattern?.test(value);
  };

  const requiredFields = [
    ['byr', range(1920, 2002)],
    ['iyr', range(2010, 2020)],
    ['eyr', range(2020, 2030)],
    [
      'hgt',
      (value) => {
        const match = value?.match(/^(\d+)(in|cm)$/);
        if (!match) return false;

        const [, height, unit] = match;

        return (unit === 'in' ? range(59, 76) : range(150, 193))(height);
      },
    ],
    ['hcl', pattern(/^#[0-9a-f]{6}$/)],
    ['ecl', pattern(/^(amb|blu|brn|gry|grn|hzl|oth)$/)],
    ['pid', pattern(/^\d{9}$/)],
    ['cid', () => true],
  ];
  const isValid = (passport) => {
    return requiredFields.every(([key, validation]) => {
      console.log(key, passport[key], validation(passport[key]));
      return validation(passport[key]);
    });
  };

  return input.filter(isValid).length;
};

export default () => {
  const res = calc2(isTest ? test() : real());

  return <p>{res}</p>;
};
