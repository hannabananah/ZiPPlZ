// Copyright (c) Meta Platforms, Inc. and affiliates.
// All rights reserved.

// This source code is licensed under the license found in the
// LICENSE file in the root directory of this source tree.

// development config
const { merge } = require("webpack-merge");
const commonConfig = require("./common");

module.exports = merge(commonConfig, {
    mode: "development",
    devServer: {
        historyApiFallback: true,
        hot: true, // enable HMR on the server
        open: true,
        // These headers enable the cross origin isolation state
        // needed to enable use of SharedArrayBuffer for ONNX
        // multithreading.
        headers: {
            "Cross-Origin-Opener-Policy": "same-origin",
            "Cross-Origin-Embedder-Policy": "credentialless",
        },
    },
    output: {
        publicPath: "/", // 모든 정적 자산의 기본 경로 설정
    },
    devtool: "cheap-module-source-map",
    resolve: {
        fullySpecified: false, // rules가 아닌 최상위 resolve에 위치해야 함
    },
});
