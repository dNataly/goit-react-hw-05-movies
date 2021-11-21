import PropTypes from 'prop-types';

export default function PageHeading({ title }) {
  return <h2 className="trending__today">{title}</h2>;
}

PageHeading.propTypes = {
  title: PropTypes.string.isRequired,
};
