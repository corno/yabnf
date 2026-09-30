import * as p_ from 'pareto-core/schema';
declare namespace Diagram_ {
    type L = Component_;
}
type Diagram_ = p_.List<Diagram_.L>;
declare namespace Root_ {
    type one_diagram = Diagram_;
    namespace multiple_diagrams {
        type D = Diagram_;
    }
    type multiple_diagrams = p_.Dictionary<multiple_diagrams.D>;
}
type Root_ = readonly ['one diagram', Root_.one_diagram] | readonly ['multiple diagrams', Root_.multiple_diagrams];
declare namespace Component_ {
    type terminal = string;
    type non_terminal = string;
    type comment = string;
    type skip = null;
    namespace sequence {
        type L = Component_;
    }
    type sequence = p_.List<sequence.L>;
    namespace choice {
        namespace options {
            type L = Component_;
        }
        type options = p_.List<options.L>;
    }
    type choice = {
        readonly 'options': choice.options;
    };
    namespace optional {
        type item = Component_;
        namespace skip {
            type normal = null;
            type skip_in_line = null;
        }
        type skip = readonly ['normal', skip.normal] | readonly ['skip in line', skip.skip_in_line];
    }
    type optional = {
        readonly 'item': optional.item;
        readonly 'skip': optional.skip;
    };
    namespace one_or_more {
        type item = Component_;
        namespace repeat {
            type O = Component_;
        }
        type repeat = p_.Optional_Value<repeat.O>;
    }
    type one_or_more = {
        readonly 'item': one_or_more.item;
        readonly 'repeat': one_or_more.repeat;
    };
    namespace zero_or_more {
        type item = Component_;
        namespace repeat {
            type O = Component_;
        }
        type repeat = p_.Optional_Value<repeat.O>;
        namespace skip {
            type normal = null;
            type skip_in_line = null;
        }
        type skip = readonly ['normal', skip.normal] | readonly ['skip in line', skip.skip_in_line];
    }
    type zero_or_more = {
        readonly 'item': zero_or_more.item;
        readonly 'repeat': zero_or_more.repeat;
        readonly 'skip': zero_or_more.skip;
    };
}
type Component_ = readonly ['terminal', Component_.terminal] | readonly ['non terminal', Component_.non_terminal] | readonly ['comment', Component_.comment] | readonly ['skip', Component_.skip] | readonly ['sequence', Component_.sequence] | readonly ['choice', Component_.choice] | readonly ['optional', Component_.optional] | readonly ['one or more', Component_.one_or_more] | readonly ['zero or more', Component_.zero_or_more];
export { type Diagram_ as Diagram, type Root_ as Root, type Component_ as Component, };
