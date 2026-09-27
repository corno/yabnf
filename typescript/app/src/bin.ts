#!/usr/bin/env -S node --enable-source-maps

import * as p_h from 'pareto-core-application/index'

import * as rs_filesystem_unrestricted from "pareto-resource-filesystem-unrestricted/index"
import * as rs_stream from "pareto-resource-stream/index"

import { $$ as c_command } from "pareto-common/modules/file_in_file_out/commands/implementations/operation"

import { $$ as q_query } from "lib/queries/implementations/generate"

p_h.run_main_command(
    () => c_command(
        {
            'indentation': "    ",
            'newline': "\n",
            // 'error message indentation': "    ",
            // 'remove before writing': true,
            // 'replace spaces in node names by underscores': true
        },
        {
            'read file': rs_filesystem_unrestricted.$.queries['read file'],
            'process data': q_query(
                null,
                null
            ),
        },
        {
            'write file': rs_filesystem_unrestricted.$.commands['write file'],
            'log error lines': rs_stream.$.commands['log error lines'],
        },
    ),
)
