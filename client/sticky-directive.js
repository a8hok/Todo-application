const directive = angular.module('stickyDirective', []);

// Directive for sticky.
directive.directive('stickyNote', () => ({
  templateUrl: 'sticky-template.html',
}));
