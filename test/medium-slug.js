const {expect} = require('chai');
const express = require('express');
const supertest = require('supertest');

const {describe, it} = require('mocha');

describe('medium style slug with id', () => {

  const app = express();

  app.get(
    [
      '/:site/:slug([^\/]+)-:id/',
    ],
    (req, res) => {
      res.json({
        path: req.route.path,
        params: req.params,
      });
    },
  );

  const expectRequest = (path, status, fn) => {
    it(path, () => {
      return supertest(app)
        .get(path)
        .set('Accept', 'application/json')
        .expect(status)
        .then(response => {
          fn && fn(response);
          if (status !== 200) {
            return;
          }

          return;
        })
    });
  }

  expectRequest('/missing/', 404);

  expectRequest('/packages/42-universe/', 200, (response) =>  {
    expect(response.body.params).to.deep.equal({
      site: 'packages',
      slug: '42',
      id: 'universe',
    })
  });

  expectRequest('/packages/universe-is-expanding/', 200, (response) =>  {
    expect(response.body.params).to.deep.equal({
      site: 'packages',
      slug: 'universe-is',
      id: 'expanding',
    })
  });

});
