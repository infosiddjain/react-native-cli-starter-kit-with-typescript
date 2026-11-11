import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  AppText,
  EmptyState,
  Header,
  Loader,
  ScreenWrapper,
  Spacer,
} from '@components/index';
import { ROUTES } from '@constants/routes';
import { useTheme } from '@hooks/useTheme';
import type { RootScreen } from '@navigation/types';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { clearSelectedPost } from '@store/slices/postsSlice';
import { fetchPostById } from '@store/thunks/postThunks';

/** Example detail screen with route params + a single-item thunk. */
const PostDetailScreen = ({ route }: RootScreen<typeof ROUTES.POST_DETAIL>) => {
  const { id, title } = route.params;
  const dispatch = useAppDispatch();
  const { colors, spacing, radius } = useTheme();
  const {
    selected: post,
    selectedStatus,
    error,
  } = useAppSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchPostById(id));
    return () => {
      dispatch(clearSelectedPost());
    };
  }, [dispatch, id]);

  const renderBody = () => {
    if (selectedStatus === 'failed') {
      return (
        <EmptyState
          title="Could not load post"
          message={error ?? undefined}
          actionLabel="Retry"
          onAction={() => dispatch(fetchPostById(id))}
        />
      );
    }
    if (!post || selectedStatus === 'loading') {
      return <Loader />;
    }
    return (
      <>
        <AppText variant="h2">{post.title}</AppText>
        <Spacer size="sm" />
        <View style={styles.tags}>
          {post.tags.map(tag => (
            <View
              key={tag}
              style={[
                styles.tag,
                {
                  backgroundColor: colors.border,
                  borderRadius: radius.full,
                  paddingHorizontal: spacing.md,
                },
              ]}
            >
              <AppText variant="caption">#{tag}</AppText>
            </View>
          ))}
        </View>
        <Spacer size="lg" />
        <AppText>{post.body}</AppText>
        <Spacer size="lg" />
        <AppText variant="caption" color="textSecondary">
          👍 {post.reactions.likes} · 👎 {post.reactions.dislikes} · 👁{' '}
          {post.views} views
        </AppText>
      </>
    );
  };

  return (
    <ScreenWrapper
      scrollable
      edges={['top', 'bottom']}
      header={<Header title={title ?? 'Post'} />}
    >
      {renderBody()}
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  tag: { paddingVertical: 4 },
});

export default PostDetailScreen;
